import React from 'react'
import classnames from 'classnames'

export default class Button extends React.Component {
  constructor(props){
    super(props)
    this.onPressButton = this.props.onPress.bind(this, this.props.index)
    this.onReleaseButton = this.props.onRelease.bind(this, this.props.index)
  }
  render() {
    const {isPressed, isRecordModeActive, data, onPressButton, onReleaseButton, index} = this.props
    return (
      <div
        onMouseDown={this.onPressButton}
        onTouchStart={this.onPressButton}
        onMouseUp={this.onReleaseButton} // todo: move to body to catch exterior clicks
        onTouchEnd={this.onReleaseButton}
        className={
          classnames({
            'sampler-button': true,
            'is-touched': isPressed,
            'is-record-mode': isRecordModeActive
          })
        }
      >
        { isRecordModeActive ? <span>Click to Record</span> : <span>Click to Play</span> }
      </div>
    )
  }
}