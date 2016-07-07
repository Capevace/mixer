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

    this.state = {
      // Data to initialize channels with
      channels: [
        {
          name: 'Drums',
          source: 'sounds/drums.mp3',
          initialFaderValue: 0,
          mixerNodes: [
            1
          ]
        },
        {
          name: 'Bass',
          source: 'sounds/bass.mp3',
          initialFaderValue: 0,
          mixerNodes: [
            0
          ]
        },
        {
          name: 'Piano',
          source: 'sounds/piano.mp3',
          initialFaderValue: 0,
          initialMuteState: false,
          mixerNodes: [
            0
          ]
        },
        {
          name: 'Clav',
          source: 'sounds/clav.mp3',
          initialFaderValue: -60,
          initialMuteState: true,
          mixerNodes: [
            0
          ]
        },
        {
          name: 'Sax',
          source: 'sounds/sax.mp3',
          initialFaderValue: 10,
          initialMuteState: true,
          mixerNodes: [
            0
          ]
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
    console.log('Master ready!', masterNode);
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
      console.log('Already?!');
      renderChannels = this.state.channels
    }

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
              mixerNodes: [
                0
              ]
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
