import React from 'react'

class Knob extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: 0,
      mouseDown: false,
      mouseX: 0
    }
  }

  handleMouseDown (e) {
    this.setState({
      mouseX: e.clientX,
      mouseDown: true
    })
  }

  handleMouseMove (e) {
    if (!this.state.mouseDown)
      return

    var difference = (e.clientX - this.state.mouseX) / (this.props.modifier || 8)
    var value = this.state.value + difference
    var min = this.props.min || 0
    var max = this.props.max || 0

    if (value < min)
      value = min

    if (value > max)
      value = max

    this.setState({
      mouseX: e.clientX,
      value: value
    }, () => {
      this.props.onChange(this.state.value)
    })
  }

  handleMouseUp () {
    this.setState({
      mouseDown: false
    })
  }

  componentDidMount () {
    document.addEventListener('mousemove', this.handleMouseMove.bind(this))
    document.addEventListener('mouseup', this.handleMouseUp.bind(this))
  }

  render () {
    return (
      <div
        className="knob"
        style={{transform: 'rotateZ(' + ((this.state.value + (this.props.offset || 0)) * (this.props.modifier / 2 || 4)) + 'deg)'}}
        onMouseDown={this.handleMouseDown.bind(this)}
      ></div>
    )
  }
}

export default Knob
