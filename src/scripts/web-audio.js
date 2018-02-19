const mediaConstraints = { audio: true }

const audio = {
  /*
    0: {
      data: float32array
      node: web audio context buffersource
    }

  */
}

const context = new AudioContext()

let processor
export const getMedia = () => navigator.mediaDevices.getUserMedia(mediaConstraints)
.then(stream => {
  const source = context.createMediaStreamSource(stream)
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
  audio[i] = {}
  audio[i].data = context.createBuffer(channels, context.sampleRate * seconds, context.sampleRate)
  onAudioProcess = (e) => {
    const array = Array.from(e.inputBuffer.getChannelData(0))
    incomingData = incomingData.concat(array)
  }
  processor.addEventListener('audioprocess', onAudioProcess)
}

export const recordStop = (i) => {
  if (audio[i] && audio[i].data) audio[i].data.copyToChannel(new Float32Array(incomingData), 0)
  processor.removeEventListener('audioprocess', onAudioProcess)
}

export const playAudio = (i) => {
  if (!audio[i]) return
  audio[i].node = context.createBufferSource()
  audio[i].node.buffer = audio[i].data
  console.log(audio[i].data.getChannelData(0))
  audio[i].node.connect(context.destination)
  audio[i].node.start()
}

export const stopAudio = (i) => {
  if (!audio[i].node) return
  audio[i].node.stop()
}
