export default {
  loadSound: url => new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
      resolve(request.response)
    }
    request.send();
  }),

  processAudioBuffer: (buffer, context) => new Promise((resolve, reject) => {
    try {
      context.decodeAudioData(buffer, resolve, reject)
      resolve()
    } catch (e) {
      console.error('Failed to decode', e);
      reject(e)
    }
  }),

  equalize: (audioProcessingEvent) => {
    var inputBuffer = audioProcessingEvent.inputBuffer
    var outputBuffer = audioProcessingEvent.outputBuffer

    for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
      var inputData = inputBuffer.getChannelData(channel)
      var outputData = outputBuffer.getChannelData(channel)

      for(var sample = 0; sample < inputBuffer.length; sample++) {
        outputData[sample] = inputData[sample]

        outputData[sample] += ((Math.random() * 2) - 1) * 0.2
      }
    }
  }
}
