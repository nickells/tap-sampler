import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from './button'
import RecordSwitch from './recordswitch'
import {
  onPressButtonRecordMode,
  onPressButtonPlayMode,
  onReleaseButtonRecordMode,
  onReleaseButtonPlayMode,
  enterRecordMode,
  exitRecordMode,
  toggleRecordMode,
  requestMedia
} from './actions'

const nine = new Array(9).fill(true)

class Main extends React.Component {
  componentDidMount(){
    this.props.requestMedia()
  }

  render(){
    const { 
      onPressButtonPlayMode,
      onPressButtonRecordMode,
      onReleaseButtonPlayMode,
      onReleaseButtonRecordMode,
      isRecordModeActive
    } = this.props
    const pressHandler = isRecordModeActive ? onPressButtonRecordMode : onPressButtonPlayMode
    const releaseHandler = isRecordModeActive ? onReleaseButtonRecordMode : onReleaseButtonPlayMode
    return (
      <React.Fragment>
        <div className="buttons-container">
          {
            nine.map((item, index) => (
              <Button
                isPressed={this.props.pressedButtons[index]}
                onPress={pressHandler}
                onRelease={releaseHandler}
                index={index}
                key={`button-${index}`}
                isRecordModeActive={this.props.isRecordModeActive}
              />
            ))
          }
        </div>
        <RecordSwitch
          isPressed={this.props.isRecordModeActive}
          onPress={this.props.enterRecordMode}
          onRelease={this.props.exitRecordMode}
          onClick={this.props.toggleRecordMode}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  audioData: state.MainReducer.audioData,
  pressedButtons: state.MainReducer.pressedButtons,
  isRecordModeActive: state.MainReducer.isRecordModeActive
})

const mapDispatchToProps = dispatch => bindActionCreators({
  onPressButtonRecordMode,
  onPressButtonPlayMode,
  onReleaseButtonRecordMode,
  onReleaseButtonPlayMode,
  enterRecordMode,
  exitRecordMode,
  toggleRecordMode,
  requestMedia
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main)
