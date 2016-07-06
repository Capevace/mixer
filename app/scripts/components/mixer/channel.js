import React from 'react'
import { loadSound, processAudioBuffer } from '../audio-processing'
import { clamp } from '../math'

import Fader from './fader'
import MuteButton from './mute-button'
import GainKnob from './gain-knob'
import Equalizer from './equalizer'


class Channel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      audioBuffer: null,
      audioNodes: {},
      gainValue: 0,
      faderValue: this.props.channel.initialFaderValue || 0,
      muted: this.props.channel.initialMuteState || false
    }

    loadSound(this.props.channel.source)
      .then(buffer => processAudioBuffer(buffer, props.context))
      .then(buffer => this.setState({audioBuffer: buffer}))
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.playing) {

      if (!this.state.audioBuffer)
        return

      var audioSource = this.props.context.createBufferSource()
      audioSource.buffer = this.state.audioBuffer
      audioSource.loop = true

      var gainNode = this.props.context.createGain()

      audioSource.connect(gainNode)
      gainNode.connect(this.props.context.destination)

      this.setState({
        audioNodes: {
          audioSource: audioSource,
          gainNode: gainNode
        }
      }, () => {
        this.updateVolume(gainNode)
        audioSource.start(0)
      })
    } else {
      if (this.state.audioNodes.audioSource)
        this.state.audioNodes.audioSource.stop(0)
    }
  }

  handleFaderChange (faderValue) {
    this.setState({faderValue: parseFloat(faderValue)}, () => {
      this.updateVolume()
    })
  }

  handleGainChange (gainValue) {
    this.setState({gainValue: parseFloat(gainValue)}, () => {
      this.updateVolume()
    })
  }

  handleMuteStateChange (muted) {
    this.setState({muted: muted}, () => {
      this.updateVolume()
    })
  }

  updateVolume () {
    var gain = clamp(1 + ((this.state.faderValue + this.state.gainValue) / 60), 0.0, 2.0)

    if (this.state.muted)
      gain = 0

    if (this.state.audioNodes.gainNode) {
      var gainNode = this.state.audioNodes.gainNode
      gainNode.gain.value = gain

      this.setState({
        audioNodes: Object.assign(this.state.audioNodes, {
          gainNode: gainNode
        })
      })
    }
  }

  render () {
    return (
      <div className="col-sm-2">
        <div className="row bottom">
          <p className="centered">{this.props.channel.name}</p>
        </div>
        <GainKnob onChange={this.handleGainChange.bind(this)} />
        <Equalizer />
        <MuteButton initialMuteState={this.props.channel.initialMuteState} onChange={this.handleMuteStateChange.bind(this)} />
        <Fader initialValue={this.state.faderValue} onChange={this.handleFaderChange.bind(this)} />
      </div>
    )
  }
}

export default Channel
