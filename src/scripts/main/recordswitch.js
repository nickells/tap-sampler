import React from 'react'
const hasTouch = 'ontouchstart' in window
console.log(hasTouch)

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
        style={isPressed ? { border: '1px solid black' } : null}
      >
        <span>Record</span>
      </div>
    )
  }
}