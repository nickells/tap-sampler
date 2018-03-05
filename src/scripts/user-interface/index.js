import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from './button'
import RecordSwitch from './recordswitch'
import {
  onPressButton,
  onReleaseButton,
  enterRecordMode,
  exitRecordMode,
  toggleRecordMode,
  requestMedia
} from './actions'

const nine = new Array(9).fill(true)

class Main extends React.Component {
  componentDidMount(){
    this.props.requestMedia()
    const qweasdzxc = {
      81: 0,
      87: 1,
      69: 2,
      65: 3,
      83: 4,
      68: 5,
      90: 6,
      88: 7,
      67: 8,
      32: 'RECORD'
    }
    document.addEventListener('keydown', e => {
      const listener = qweasdzxc[e.keyCode]
      if (typeof listener === 'number') {
        if (this.props.pressedButtons[listener]) return
        this.props.onPressButton(listener)
      }
      else if (listener === 'RECORD') {
        e.preventDefault()
        if (this.props.isRecordModeActive) return
        this.props.enterRecordMode()
      }
    })
    document.addEventListener('keyup', e => {
      const listener = qweasdzxc[e.keyCode]
      if (typeof listener === 'number') {
        if (!this.props.pressedButtons[listener]) return
        this.props.onReleaseButton(listener)
      }
      else if (listener === 'RECORD') {
        if (!this.props.isRecordModeActive) return
        this.props.exitRecordMode()
      }
    })
  }

  render(){
    const { 
      onPressButton,
      onReleaseButton,
      isRecordModeActive
    } = this.props
    return (
      <React.Fragment>
        <h1>Tapas</h1>
        <div className="buttons-container">
          {
            nine.map((item, index) => (
              <Button
                isPressed={this.props.pressedButtons[index]}
                onPress={onPressButton}
                onRelease={onReleaseButton}
                index={index}
                key={`button-${index}`}
                isRecordModeActive={this.props.isRecordModeActive}
                visualizationData={this.props.visualizations[index]}
              />
            ))
          }
        <RecordSwitch
          isPressed={this.props.isRecordModeActive}
          onPress={this.props.enterRecordMode}
          onRelease={this.props.exitRecordMode}
          onClick={this.props.toggleRecordMode}
        />
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  audioData: state.MainReducer.audioData,
  pressedButtons: state.MainReducer.pressedButtons,
  isRecordModeActive: state.MainReducer.isRecordModeActive,
  visualizations: state.MainReducer.visualizations
})

const mapDispatchToProps = dispatch => bindActionCreators({
  onPressButton,
  onReleaseButton,
  enterRecordMode,
  exitRecordMode,
  toggleRecordMode,
  requestMedia
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main)
