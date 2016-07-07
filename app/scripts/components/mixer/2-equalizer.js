import React from 'react'
import Knob from './knob'

class ThreeBandEqualizer extends React.Component {
  constructor (props) {
    super(props)

    var highEqualizerNode = this.props.audioContext.createBiquadFilter()
    highEqualizerNode.type = 'peaking'
    highEqualizerNode.frequency.value = 6500
    highEqualizerNode.gain.value = 0
    highEqualizerNode.Q.value = 1

    var midEqualizerNode = this.props.audioContext.createBiquadFilter()
    midEqualizerNode.type = 'peaking'
    midEqualizerNode.frequency.value = 550
    midEqualizerNode.gain.value = 0
    midEqualizerNode.Q.value = 1

    var lowEqualizerNode = this.props.audioContext.createBiquadFilter()
    lowEqualizerNode.type = 'peaking'
    lowEqualizerNode.frequency.value = 100
    lowEqualizerNode.gain.value = 0
    lowEqualizerNode.Q.value = 1

    this.state = {
      lowShelfValue: 0,
      midShelfValue: 0,
      highShelfValue: 0,
      highEqualizerNode: highEqualizerNode,
      midEqualizerNode: midEqualizerNode,
      lowEqualizerNode: lowEqualizerNode
    }

    this.connects = 's'
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.connector && nextProps.shouldReconnect) {
      this.connect(nextProps.connector)

      this.connected = true
      this.props.onConnect(this.getFirstAudioNode())
    }
  }

  getFirstAudioNode () {
    return this.state.highEqualizerNode
  }

  connect (destination) {
    this.state.highEqualizerNode.connect(this.state.midEqualizerNode)
    this.state.midEqualizerNode.connect(this.state.lowEqualizerNode)
    this.state.lowEqualizerNode.connect(destination)
  }

  handleHighChange (value) {
    var equalizerNode = this.state.highEqualizerNode
    equalizerNode.gain.value = value

    this.setState({ highEqualizerNode: equalizerNode })
  }

  handleMidChange (value) {
    var equalizerNode = this.state.midEqualizerNode
    equalizerNode.gain.value = value

    this.setState({ midEqualizerNode: equalizerNode })
  }

  handleLowChange (value) {
    var equalizerNode = this.state.lowEqualizerNode
    equalizerNode.gain.value = value

    this.setState({ lowEqualizerNode: equalizerNode })
  }

  render () {
    return (
      <div className="row bottom">
        <div className="row knob-row">
          <p className="centered bottom">HF</p>
          <Knob
            modifier={6}
            min={-40.0}
            max={40.0}
            onChange={this.handleHighChange.bind(this)}
          />
        </div>
        <div className="row knob-row">
          <p className="centered bottom">MF</p>
          <Knob
            modifier={6}
            min={-40.0}
            max={40.0}
            onChange={this.handleMidChange.bind(this)}
          />
        </div>
        <div className="row knob-row">
          <p className="centered bottom">LF</p>
          <Knob
            modifier={6}
            min={-40.0}
            max={40.0}
            onChange={this.handleLowChange.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default ThreeBandEqualizer
