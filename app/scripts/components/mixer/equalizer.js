import React from 'react'
import Knob from './knob'

class Equalizer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      lowShelfValue: 0,
      midShelfValue: 0,
      highShelfValue: 0
    }
  }

  handleHighChange (newHighValue) {
    this.setState({
      highShelfValue: newHighValue
    })

    this.props.onChange(newHighValue, 'high')
  }

  handleMidChange (newMidValue) {
    this.setState({
      midShelfValue: newMidValue
    })

    this.props.onChange(newMidValue, 'mid')
  }

  handleLowChange (newLowValue) {
    this.setState({
      lowShelfValue: newLowValue
    })

    this.props.onChange(newLowValue, 'low')
  }

  render () {
    return (
      <div className="row bottom">
        <div className="row knob-row">
          <p className="centered bottom">HF</p>
          <Knob modifier={6} min={-40.0} max={40.0} onChange={this.handleHighChange.bind(this)} />
        </div>
        <div className="row knob-row">
          <p className="centered bottom">MF</p>
          <Knob modifier={6} min={-40.0} max={40.0} onChange={this.handleMidChange.bind(this)} />
        </div>
        <div className="row knob-row">
          <p className="centered bottom">LF</p>
          <Knob modifier={6} min={-40.0} max={40.0} onChange={this.handleLowChange.bind(this)} />
        </div>
      </div>
    )
  }
}

export default Equalizer
