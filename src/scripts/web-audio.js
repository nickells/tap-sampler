const mediaConstraints = { audio: true }
let source
let processor

const buffers = {

}

const context = new AudioContext()
let gainNode

export const getMedia = () => navigator.mediaDevices.getUserMedia(mediaConstraints)
.then(stream => {
  source = context.createMediaStreamSource(stream)
  console.log(context.sampleRate)
  processor = context.createScriptProcessor(undefined, 1, 1);
  source.connect(processor)
  processor.connect(context.destination)
})
.catch((err) => {
  console.log(`The following gUM error occured: ${err}`);
})

let onAudioProcess
let newBuffer
let newData = []
export const recordStart = (i) => {
  const seconds = 3
  const channels = 1
  console.log(context)
  newBuffer = context.createBuffer(channels, context.sampleRate * seconds, context.sampleRate)
  let count = 0
  onAudioProcess = (e) => {
    const array = Array.from(e.inputBuffer.getChannelData(0))
    newData = newData.concat(array)
    // Do something with the data, i.e Convert this to WAV
    // count++
  }
  processor.addEventListener('audioprocess', onAudioProcess)
}

export const recordStop = (i) => {
  newBuffer.copyToChannel(new Float32Array(newData), 0)
  processor.removeEventListener('audioprocess', onAudioProcess)
}

export const playAudio = (i) => {
  const bufferToPlay = context.createBufferSource()
  console.log(newBuffer)
  bufferToPlay.buffer = newBuffer
  bufferToPlay.connect(context.destination)
  bufferToPlay.start()
}

export const stopAudio = (i) => {

}