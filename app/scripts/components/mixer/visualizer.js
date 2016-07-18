import React from 'react';
import ChannelNode from './channel-node';

class Visualizer extends ChannelNode {
  constructor (props) {
    super(props);

    this.audioAnalyser = this.props.audioContext.createAnalyser();
    this.shouldPlay = false;
  }

  frameRender () {
    if (this.shouldPlay)
      this.frameRenderLoop = requestAnimationFrame(this.frameRender.bind(this));
    else
      this.frameRenderLoop = null;

    let dataArray = new Uint8Array(this.audioAnalyser.frequencyBinCount);
    this.audioAnalyser.getByteFrequencyData(dataArray);

    if (this._canvas) {
      const canvasNode = this._canvas.getDOMNode();
      const canvasContext = canvasNode.getContext('2d');

      let highest = 0;
      for(let i = 0; i < this.audioAnalyser.frequencyBinCount; i++) {
        const v = dataArray[i]/2;
        if (v > highest)
          highest = v;
      }

      canvasContext.fillStyle = 'rgb(' + (highest) + ', ' + (150 - highest) + ', 0)';
      canvasContext.fillRect(0, 0, canvasNode.width, canvasNode.height);

      // canvasContext.lineWidth = 2;
      // canvasContext.strokeStyle = 'rgb(0,0,0)';
      // canvasContext.beginPath();
      //
      // // const sliceWidth = canvasNode.width * 1.0 / this.audioAnalyser.frequencyBinCount;
      // const barWidth = (canvasNode.width / this.audioAnalyser.frequencyBinCount) * 2.5;
      // let x = 0;
      //
      // for(let i = 0; i < this.audioAnalyser.frequencyBinCount; i++) {
      //   const barHeight = dataArray[i] / 2;
      //
      //
      //   canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',' + (255-barHeight) + ',50)';
      //   canvasContext.fillRect(x, canvasNode.height - barHeight / 2, barWidth, barHeight);
      //
      //   x += barWidth + 1;
      // }

      // console.log(dataArray);
    }
  }

  componentWillReceiveProps (nextProps) {
    super.componentWillReceiveProps(nextProps);

    if (nextProps.playing) {
      this.shouldPlay = true;
      this.frameRenderLoop = this.frameRender();
    } else {
      this.shouldPlay = false;
      this.frameRenderLoop = null;
    }
  }

  getFirstAudioNode () {
    return this.audioAnalyser;
  }

  connect (destination) {
    this.audioAnalyser.connect(destination);
  }

  render () {
    console.log('updated!');
    return (
      <div>
        <canvas className="visualizer" ref={c => { this._canvas = c; }}></canvas>
      </div>
    );
  }
}

export default Visualizer;
