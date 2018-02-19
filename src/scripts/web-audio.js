const mediaConstraints = { audio: true }
let processor

const buffers = {

}

const context = new AudioContext()

export const getMedia = () => navigator.mediaDevices.getUserMedia(mediaConstraints)
.then(stream => {
  let source = context.createMediaStreamSource(stream)
  processor = context.createScriptProcessor(undefined, 1, 1);
  source.connect(processor)
  processor.connect(context.destination)
})
.catch((err) => {
  console.log(`The following gUM error occured: ${err}`);
})

let onAudioProcess
let incomingData = []
export const recordStart = (i) => {
  const seconds = 3
  const channels = 1
  incomingData = []
  buffers[i] = context.createBuffer(channels, context.sampleRate * seconds, context.sampleRate)
  onAudioProcess = (e) => {
    const array = Array.from(e.inputBuffer.getChannelData(0))
    incomingData = incomingData.concat(array)
  }
  processor.addEventListener('audioprocess', onAudioProcess)
}

export const recordStop = (i) => {
  if (buffers[i]) buffers[i].copyToChannel(new Float32Array(incomingData), 0)
  processor.removeEventListener('audioprocess', onAudioProcess)
}

export const playAudio = (i) => {
  const bufferToPlay = context.createBufferSource()
  bufferToPlay.buffer = buffers[i]
  bufferToPlay.connect(context.destination)
  bufferToPlay.start()
}

export const stopAudio = (i) => {

}