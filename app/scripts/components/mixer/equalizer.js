import React from 'react'
import Knob from './knob'

class Equalizer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {

    }
  }

  render () {
    return (
      <div className="row bottom">
        <div className="row bottom">
          <div className="col-sm-12">
            <p className="centered">HF</p>
            <Knob modifier={16} min={-15.0} max={15.0} />
          </div>
        </div>
        <div className="row bottom">
          <Knob min={-15.0} max={15.0} />
        </div>
        <div className="row bottom">
          <Knob min={-15.0} max={15.0} />
        </div>
      </div>
    )
  }
}

export default Equalizer
