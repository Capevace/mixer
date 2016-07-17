import React from 'react';
import ChannelNode from './channel-node';
import { clamp } from '../math';

class VolumeFader extends ChannelNode {
  constructor (props) {
    super(props);

    this.gainNode = this.props.audioContext.createGain();

    this.state = {
      value: props.initialValue || 0
    };
  }

  getFirstAudioNode () {
    return this.gainNode;
  }

  connect (destination) {
    this.gainNode.connect(destination);
  }

  handleChange (event) {
    this.gainNode.gain.value = clamp(1 + (event.target.value / 60), 0.0, 2.0);
    this.setState({value: event.target.value});
  }

  readableValue () {
    var value = this.state.value;

    if (value <= -60) {
      return '-∞ db';
    }

    return (value === 0 ? '' : (value > 0 ? '+' : '')) + value + ' db';
  }

  render () {
    return (
      <div className="row slider-row bottom">
        <p className="volume-label">
          Value: {this.readableValue()}
        </p>
        <input
          className="music-slider"
          type="range"
          min={-60}
          max={20.0}
          step={0.1}
          orient="vertical"
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          />
      </div>
    );
  }
}

export default VolumeFader;
