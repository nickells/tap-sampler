import React from 'react'
import areArraysEqual from '../deepArrayCompare.js'

class Visualization extends React.Component {
  componentDidMount(){
    const { data, width = 100, height = 100, color } = this.props
    this.fillCanvas = this.fillCanvas.bind(this)

    this.fillCanvas(data, color)
  }

  componentWillReceiveProps(nextProps){
    if (areArraysEqual(nextProps.data, this.props.data)) return
    this.fillCanvas(nextProps.data, nextProps.color)
  }


  fillCanvas(data, color) {
    const context = this.$canvas.getContext('2d')
    context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    context.fillStyle = color
    if (false) {
      data.forEach((height,x) => {
        context.fillRect(x, (this.$canvas.width - height), 1, this.$canvas.width)
      })
    } else {
      context.beginPath()
      context.lineWidth=0.5
      context.moveTo(0, this.$canvas.height / 2)
      context.strokeStyle = color
      data.forEach((height, x) => {
        context.lineTo(x, height);
        context.stroke();
      })
    }
  }

  render() {
    const { width = 100, height = 100 } = this.props
    return (
      <canvas ref={($canvas) => this.$canvas = $canvas} width={width} height={height}/>
    )
  }

}

export default Visualization