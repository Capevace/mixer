import React from 'react';
import ChannelNode from './channel-node';

class MuteButton extends ChannelNode {
  constructor (props) {
    super(props);

    this.gainNode = this.props.audioContext.createGain();

    this.state = {
      muted: this.props.initialNodeState
    };
  }

  connect (destination) {
    this.gainNode.connect(destination);
  }

  getFirstAudioNode () {
    return this.gainNode;
  }

  handleClick () {
    var muted = !this.state.muted;
    this.gainNode.gain.value = muted ? 0 : 1;

    this.setState({
      muted: muted
    });
  }

  render () {
    return (
      <div className="row bottom">
        <div className="col-sm-12">
          <button className={'btn btn-sm mute-button ' + (this.state.muted ? 'btn-danger' : '')} onClick={this.handleClick.bind(this)}>{this.state.muted ? 'Unmute' : 'Mute'}</button>
        </div>
      </div>
    );
  }
}

export default MuteButton;
