function makeSample(_index, audioContextInstance, scriptProcessor){
  const index = _index
  const secondsLength = 3
  const channels = 1
  const cachedBuffer = context.createBuffer(channels, context.sampleRate * secondsLength, context.sampleRate)
  let node = undefined

  // hold data here as it comes in
  let incomingData = []

  const onAudioProcess = (audioEvent) => {
    console.log('audio process')
    const array = Array.from(audioEvent.inputBuffer.getChannelData(0))
    incomingData.push(...array)
  }

  const emptyBuffer = new Float32Array(context.sampleRate * secondsLength).fill(0)

  return {
    recordStart() {
      // Clear the buffer
      cachedBuffer.copyToChannel(emptyBuffer, 0)

      // Start recording event, but wait for latency
      setTimeout(() => {
        scriptProcessor.addEventListener('audioprocess', onAudioProcess)
      }, context.baseLatency * 1000)
    },

    recordStop() {
      if (incomingData.length === 0) return

      // Copy contents of incomingData into cached buffer
      cachedBuffer.copyToChannel(new Float32Array(incomingData), 0)

      // Reset incoming data array
      incomingData = []

      // Stop listening
      scriptProcessor.removeEventListener('audioprocess', onAudioProcess)
    },

    playAudio() {
      // Create a new buffer source
      node = audioContextInstance.createBufferSource()

      // Attach our cached buffer data to the buffer source
      node.buffer = cachedBuffer

      // Connect buffer to the destination
      node.connect(audioContextInstance.destination)

      // Play
      node.start()
    },

    stopAudio(){
      if (!node) return
      node.stop()
    }
  }
}

const mediaConstraints = { audio: true }
const context = new AudioContext()
console.log('base latency', context.baseLatency)
console.log('output latency', context.outputLatency)

const samples = []
export const getMedia = async () => {
  const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints)
  const source = context.createMediaStreamSource(stream)
  const processor = context.createScriptProcessor(undefined, 1, 1);
  source.connect(processor)
  processor.connect(context.destination)
  for (let i = 0; i < 9; i++) {
    samples[i] = makeSample(i, context, processor)
  }
}


export const recordStart = (i) => {
  return samples[i].recordStart()
}

export const recordStop = (i) => {
  if (!i) samples.forEach(sample => sample.recordStop())
  else return samples[i].recordStop()
}

export const playAudio = (i) => {
  return samples[i].playAudio()
}

export const stopAudio = (i) => {
  return samples[i].stopAudio()
}
