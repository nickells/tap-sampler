import React from 'react'
import classnames from 'classnames'
import Visualization from './visualization'

export default class Button extends React.Component {
  render() {
    const { 
      isPressed,
      isRecordModeActive,
      data,
      onPress,
      onRelease,
      index,
      visualizationData
    } = this.props
    const onPressButton = onPress.bind(this, index)
    const onReleaseButton = onRelease.bind(this, index)
    const recordText = isPressed ? 'Recording...' : 'Hold to record'
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
        { isRecordModeActive ? <span>{recordText}</span> : <span>Hold to Play</span> }
        <Visualization data={visualizationData}></Visualization>
      </div>
    )
  }
}