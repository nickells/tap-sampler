import React from 'react'
import classnames from 'classnames'
import Visualization from './visualization'

const getColorForIndex = (index) => {
  return `hsla(${((360 / 9) * index)}, 100%, 75%, 1)`
}

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
    const recordText = isPressed ? 'Recording...' : 'Record'
    const canvasSize = ((window.innerWidth / 3) * .9) - 10
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
        <div className="content" style={{
          borderColor: getColorForIndex(index)
        }}>
          { isRecordModeActive ? <span>{recordText}</span> : <span>Play</span> }
          <Visualization data={visualizationData} width={canvasSize} height={canvasSize} color={'black'}></Visualization>
        </div>
      </div>
    )
  }
}