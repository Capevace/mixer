import React from 'react';
import Knob from '../elements/knob';
import ChannelNode from './channel-node';

class ThreeBandEqualizer extends ChannelNode {
  constructor (props) {
    super(props);

    this.highEqualizerNode = this.props.audioContext.createBiquadFilter();
    this.highEqualizerNode.type = 'peaking';
    this.highEqualizerNode.frequency.value = 6500;
    this.highEqualizerNode.gain.value = 0;
    this.highEqualizerNode.Q.value = 1;

    this.midEqualizerNode = this.props.audioContext.createBiquadFilter();
    this.midEqualizerNode.type = 'peaking';
    this.midEqualizerNode.frequency.value = 550;
    this.midEqualizerNode.gain.value = 0;
    this.midEqualizerNode.Q.value = 1;

    this.lowEqualizerNode = this.props.audioContext.createBiquadFilter();
    this.lowEqualizerNode.type = 'peaking';
    this.lowEqualizerNode.frequency.value = 100;
    this.lowEqualizerNode.gain.value = 0;
    this.lowEqualizerNode.Q.value = 1;
  }

  getFirstAudioNode () {
    this.highEqualizerNode.name = 'test';
    return this.highEqualizerNode;
  }

  connect (destination) {
    this.highEqualizerNode.connect(this.midEqualizerNode);
    this.midEqualizerNode.connect(this.lowEqualizerNode);
    this.lowEqualizerNode.connect(destination);
  }

  handleHighChange (value) {
    this.highEqualizerNode.gain.value = value;
  }

  handleMidChange (value) {
    this.midEqualizerNode.gain.value = value;
  }

  handleLowChange (value) {
    this.lowEqualizerNode.gain.value = value;
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
    );
  }
}

export default ThreeBandEqualizer;
