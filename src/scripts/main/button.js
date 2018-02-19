import React from 'react'

export default class Button extends React.Component {
  constructor(props){
    super(props)
    this.onPressButton = this.props.onPressButton.bind(this, this.props.index)
    this.onReleaseButton = this.props.onReleaseButton.bind(this, this.props.index)
  }
  render() {
    const {isPressed, data, onPressButton, onReleaseButton, index} = this.props
    return (
      <div
        className="sampler-button"
        onMouseDown={this.onPressButton}
        onTouchStart={this.onPressButton}
        onMouseUp={this.onReleaseButton} // todo: move to body to catch exterior clicks
        onTouchEnd={this.onReleaseButton}
        style={isPressed ? { border: '1px solid black' } : null}
      >
        Click Me??
      </div>
    )
  }
}