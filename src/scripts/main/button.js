import React from 'react'
import classnames from 'classnames'

export default class Button extends React.Component {
  render() {
    const {isPressed, isRecordModeActive, data, onPress, onRelease, index} = this.props
    const onPressButton = this.props.onPress.bind(this, this.props.index)
    const onReleaseButton = this.props.onRelease.bind(this, this.props.index)
    return (
      <div
        onMouseDown={onPressButton}
        onTouchStart={onPressButton}
        onMouseUp={onReleaseButton} // todo: move to body to catch exterior clicks
        onTouchEnd={onReleaseButton}
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