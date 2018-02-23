import React from 'react'

class Visualization extends React.Component {
  componentDidMount(){
    const {data, width = 100, height = 100} = this.props
    this.fillCanvas.call(this)
  }

  componentWillReceiveProps(nextProps){
    this.fillCanvas.call(this)
  }

  fillCanvas() {
    const { data } = this.props
    const context = this.$canvas.getContext('2d')
    context.fillStyle = '#0000FF'
    data.forEach((height,x) => {
      context.fillRect(x, (100 - height), 1, 100)
    })
  }

  render() {
    const { width = 100, height = 100 } = this.props
    return (
      <canvas ref={($canvas) => this.$canvas = $canvas} width={width} height={height}/>
    )
  }

}

export default Visualization