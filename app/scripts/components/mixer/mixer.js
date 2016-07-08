import React from 'react'
import Channel from './2-channel'

/*

  How the mixer works:
   - Mixer renders multiple channels
      - Channel manages own audio tracks
      - Channel passes signal to all its effects, then through master gain

 */


class Mixer extends React.Component {
  constructor (props) {
    super(props)

    // Determine if AudioContext is even available
    var SafeAudioContext = window.AudioContext || window.webkitAudioContext
    var context = new SafeAudioContext()

    this.nodes = [
      {
        type: 'ThreeBandEqualizer',
        initialNodeState: {
          high: 0,
          mid: 0,
          low: 0
        }
      },
      {
        type: 'VolumeFader',
        initialNodeState: 0
      }
      ,
      {
        type: 'MuteButton',
        initialNodeState: false
      }
    ]

    this.state = {
      // Data to initialize channels with
      channels: [
        {
          name: 'Drums',
          source: 'sounds/drums.mp3',
          nodes: this.nodes
        }
        ,
        {
          name: 'Bass',
          source: 'sounds/bass.mp3',
          nodes: this.nodes
        },
        {
          name: 'Piano',
          source: 'sounds/piano.mp3',
          nodes: this.nodes
        },
        {
          name: 'Clav',
          source: 'sounds/clav.mp3',
          nodes: this.nodes
        },
        {
          name: 'Sax',
          source: 'sounds/sax.mp3',
          nodes: this.nodes
        }
      ],
      context: context,
      masterNode: null,
      playing: false
    }
  }

  togglePlay () {
    this.setState({playing: !this.state.playing})
  }

  handleMasterReady (masterNode) {
    this.setState({masterNode: masterNode})
  }

  renderChannels () {
    if (this.state.masterNode) {
      this.state.channels.map((channel, index) => (
        <Channel channel={channel} key={index} audioContext={this.state.context} playing={this.state.playing} initialNode={this.state.masterNode} />
      ))
    }
  }

  render () {
    var renderChannels = []

    if (this.state.masterNode) {
      renderChannels = this.state.channels
    }

    return (
      <div className="mixer container-fluid">
        <br />
        <div className="row">
          <div className="container">
            <button className="btn btn-lg primary" onClick={this.togglePlay.bind(this)}>
              {this.state.playing ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
        <hr />
        <div className="row">
          {renderChannels.map((channel, index) => (
            <Channel
              channel={channel}
              key={index}
              audioContext={this.state.context}
              playing={this.state.playing}
              initialNode={this.state.masterNode}
            />
          ))}
          <Channel
            channel={{
              name: 'Master',
              isMaster: true,
              initialFaderValue: 0,
              initialMuteState: false,
              nodes: this.nodes
            }}
            key={'master'}
            audioContext={this.state.context}
            initialNode={this.state.context.destination}
            onReady={this.handleMasterReady.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default Mixer
