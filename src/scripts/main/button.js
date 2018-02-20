import React from 'react'
import classnames from 'classnames'

export default class Button extends React.Component {
  render() {
    const { isPressed, isRecordModeActive, data, onPress, onRelease, index} = this.props
    const onPressButton = onPress.bind(this, index)
    const onReleaseButton = onRelease.bind(this, index)
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
        { isRecordModeActive ? <span>Hold to Record</span> : <span>Hold to Play</span> }
      </div>
    )
  }
}