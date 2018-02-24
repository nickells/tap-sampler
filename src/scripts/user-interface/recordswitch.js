import React from 'react'
const hasTouch = 'ontouchstart' in window
import classnames from 'classnames'

export default class RecordSwitch extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    const { isPressed, onPress, onRelease, onClick } = this.props
    return (
      <div
        className="sampler-button"
        onTouchStart={hasTouch ? onPress : null}
        onTouchEnd={hasTouch ? onRelease : null}
        onClick={hasTouch ? null : onClick }
        className={classnames({
          'sampler-button': true,
          'is-touched': isPressed
        })}
      >
        { !isPressed ? <span>Enter record mode</span>
          : <span>Record mode active...</span> }
      </div>
    )
  }
}