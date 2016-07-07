import React from 'react'
import Knob from './knob'

class GainKnob extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: 0
    }
  }

  handleKnobChange (newValue) {
    this.setState({
      value: newValue
    })

    this.props.onChange(newValue)
  }

  render () {
    return (
      <div className="row bottom">
        <Knob offset={-10} min={-20.0} max={40.0} onChange={this.handleKnobChange.bind(this)} />
        <p className="centered">{this.state.value}</p>
      </div>
    )
  }
}

export default GainKnob
