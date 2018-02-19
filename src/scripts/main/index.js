import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from './button'
import {
  onPressButton,
  onReleaseButton
} from './actions'

const nine = new Array(9).fill(true)

class Main extends React.Component {
  componentDidMount(){

  }

  render(){
    return (
      <div className="buttons-container">
        {
          nine.map((item, index) => (
            <Button
              isPressed={this.props.pressedButtons[index]}
              onPressButton={this.props.onPressButton}
              onReleaseButton={this.props.onReleaseButton}
              data={this.props.audioData[index]}
              index={index}
              key={`button-${index}`}
            />
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  audioData: state.MainReducer.audioData,
  pressedButtons: state.MainReducer.pressedButtons,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  onPressButton,
  onReleaseButton,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main)
