import React from 'react';

class ChannelNode extends React.Component {
  constructor (props) {
    super(props);

    if (!this.props.audioContext)
      console.error('An AudioContext must be passed as a property in order to use the ChannelNode');
  }

  getFirstAudioNode () {
    console.error('"getFirstAudioNode" is not implemented in this channel node! This is required!');
    return null;
  }

  connect () {
    console.error('"getFirstAudioNode" is not implemented in this channel node! This is required!');
    return null;
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.connector && !this.getFirstAudioNode().connected) {
      this.connect(nextProps.connector);
      this.getFirstAudioNode().connected = true;

      this.props.onConnect(this.getFirstAudioNode());
    }
  }
}

ChannelNode.propTypes = {
  audioContext: React.PropTypes.instanceOf(window.AudioContext).isRequired,
  onConnect: React.PropTypes.func.isRequired
};

export default ChannelNode;
