import React from 'react'

export default class RecordSwitch extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    const { isPressed, onPress, onRelease, onClick } = this.props
    return (
      <div
        className="sampler-button"
        onTouchStart={onPress}
        onTouchEnd={onRelease}
        onClick={onClick}
        style={isPressed ? { border: '1px solid black' } : null}
      >
        <span>Record</span>
      </div>
    )
  }
}