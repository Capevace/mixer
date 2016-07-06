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
    context.decodeAudioData(buffer, resolve, reject)
  })
}
