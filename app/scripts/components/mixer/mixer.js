import React from 'react'
import Channel from './channel'


class Mixer extends React.Component {
  constructor (props) {
    super(props)

    var SafeAudioContext = window.AudioContext || window.webkitAudioContext

    this.state = {
      channels: [
        {
          name: 'Drums',
          source: 'sounds/drums.mp3',
          initialFaderValue: 0
        },
        {
          name: 'Bass',
          source: 'sounds/bass.mp3',
          initialFaderValue: 0
        },
        {
          name: 'Drums',
          source: 'sounds/piano.mp3',
          initialFaderValue: 0,
          initialMuteState: false
        },
        {
          name: 'Drums',
          source: 'sounds/clav.mp3',
          initialFaderValue: -60,
          initialMuteState: true
        }
      ],
      context: new SafeAudioContext(),
      playing: false
    }
  }

  togglePlay () {
    this.setState({playing: !this.state.playing})
  }

  render () {
    return (
      <div className="mixer container-fluid">
        <br />
        <div className="row">
          <div className="col-md-12">
            <button className="btn btn-lg primary" onClick={this.togglePlay.bind(this)}>
              {this.state.playing ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
        <hr />
        <div className="row">
          {this.state.channels.map((channel, index) => (
            <Channel channel={channel} key={index} context={this.state.context} playing={this.state.playing} />
          ))}
        </div>
      </div>
    )
  }
}

export default Mixer
