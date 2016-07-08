import React from 'react'
import { loadSound, processAudioBuffer, equalize } from '../audio-processing'
import { clamp } from '../math'

import MuteButton from './2-mute-button'
import ThreeBandEqualizer from './2-equalizer'
import VolumeFader from './2-volume-fader'


class Channel extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      audioBuffer: null,
      audioSource: null,

      connectors: [],
      nodeCount: 0,
      nodesConnected: false
    }

    this.connectResolve = null
  }

  componentWillReceiveProps (nextProps) {
    // If true, channel should start playing
    if (nextProps.playing) {
      // Abort if all nodes havent connected yet.
      if (!this.state.nodesConnected || this.props.channel.isMaster)
        return

      // Create new AudioSource with previously loaded buffer
      var audioSource = this.props.audioContext.createBufferSource()
      audioSource.buffer = this.state.audioBuffer
      audioSource.loop = true

      // Connect AudioSource to last node in connectors array (=> first node receiving signal)
      audioSource.connect(this.state.connectors[this.state.connectors.length - 1])

      // Start playing after updating component state
      this.setState({ audioSource: audioSource }, () => { audioSource.start(0) })
    } else {
      if (this.state.audioSource) {
        // If AudioSource exists, stop playing, disconnect from node and update state
        this.state.audioSource.stop(0)
        this.state.audioSource.disconnect()
        this.setState({ audioSource: null })
      }
    }
  }


  componentDidMount () {
    var loadSoundPromise


    // If channel is master, theres no need to load a sound so promise is
    // instantly resolved.
    if (this.props.channel.isMaster) {
      loadSoundPromise = Promise.resolve()
    } else {
      loadSoundPromise = loadSound(this.props.channel.source)
          .then(buffer => processAudioBuffer(buffer, this.props.audioContext))
          .then(buffer => this.setState({audioBuffer: buffer}))
    }

    // After processing the audio and connecting the nodes are both finished,
    //  - update state to nodesConnected: true so that nodes dont keep reconnecting
    //  - notify parent component that all nodes are connected
    Promise.all([loadSoundPromise, this.startConnect()])
      .then(() => {
        this.setState({nodesConnected: true})

        // Notify parent that channel has connected its nodes
        if (this.props.onReady)
          this.props.onReady(this.state.connectors[this.state.connectors.length - 1])
      })
  }

  startConnect () {
    return new Promise((resolve, reject) => {
      // Save resolve method so promise can be resolved later in other function
      this.connectResolve = resolve

      // Update state to
      //  - nodesConnected: false so nodes start connecting
      //  - add initialNode to connectors so
      //    first node (=> last node receiving signal) can connect to it
      //  - update nodeCount, so we know when to stop pushing nodes to connectors
      this.setState({
        nodesConnected: false,
        connectors: [
          this.props.initialNode
        ],
        nodeCount: this.props.channel.nodes.length || 0
      })
    })
  }

  handleConnect (nextNode) {
    // Push new node to connectors
    // (nextNode is getting signal before the previously handled node)
    var connectors = this.state.connectors

    connectors.push(nextNode)

    // If connectors are at nodeCount, resolve connect
    // (nodeCount + 1 so the context destination node is also included in the count)
    //
    // Otherwise update state with new connectors to trigger next connect
    if (this.state.connectors.length == this.state.nodeCount + 1 && this.connectResolve) {
      this.state.connectors = connectors
      this.state.nodesConnected = true

      this.connectResolve()
      this.connectResolve = false
    } else if (this.state.connectors.length < this.state.nodeCount + 1) {
      this.setState({connectors: connectors})
    }
  }

  render () {
    return (
      <div className="col-sm-2">
        <div className="row bottom">
          <p className="centered">{this.props.channel.name}</p>
        </div>
        {this.props.channel.nodes.map((node, index) => {
          switch (node.type) {
            case 'ThreeBandEqualizer':
              return <ThreeBandEqualizer
                        key={index}
                        audioContext={this.props.audioContext}
                        connector={this.state.connectors[index]}
                        onConnect={this.handleConnect.bind(this)}
                        initialNodeState={node.initialNodeState}
                      />
              break
            case 'VolumeFader':
              return <VolumeFader
                        key={index}
                        audioContext={this.props.audioContext}
                        connector={this.state.connectors[index]}
                        onConnect={this.handleConnect.bind(this)}
                        initialNodeState={node.initialNodeState}
                    />
              break
            case 'MuteButton':
              return <MuteButton
                        audioContext={this.props.audioContext}
                        connector={this.state.connectors[index]}
                        onConnect={this.handleConnect.bind(this)}
                        key={index}
                        initialNodeState={node.initialNodeState}
                      />
              break
            default:
              return <div>Unknown ChannelNodeType: {node.type}</div>
          }})
        }
      </div>
    )
  }
}

export default Channel



// updateVolume () {
//   var gain = clamp(1 + ((this.state.faderValue + this.state.gainValue) / 60), 0.0, 2.0)
//
//   if (this.state.muted)
//     gain = 0
//
//   if (this.state.audioNodes.gainNode) {
//     var gainNode = this.state.audioNodes.gainNode
//     gainNode.gain.value = gain
//
//     this.setState({
//       audioNodes: Object.assign(this.state.audioNodes, {
//         gainNode: gainNode
//       })
//     })
//   }
// }
