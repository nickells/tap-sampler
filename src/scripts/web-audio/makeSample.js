const waitMilliseconds = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default function makeSample(_index, audioContextInstance, stream){
  const index = _index
  const secondsLength = 3
  const channels = 1
  const cachedBuffer = audioContextInstance.createBuffer(channels, audioContextInstance.sampleRate * secondsLength, audioContextInstance.sampleRate)
  let processor
  let node = undefined

  const latencyMs = audioContextInstance.baseLatency * 1000

  // hold data here as it comes in
  let incomingData = []

  const onAudioProcess = (audioProcessingEvent) => { 
    const array = Array.from(audioProcessingEvent.inputBuffer.getChannelData(0))
    incomingData.push(...array)
  }

  const emptyBuffer = new Float32Array(audioContextInstance.sampleRate * secondsLength).fill(0)

  // Create new processor
  processor = audioContextInstance.createScriptProcessor(undefined, 1, 1);
  processor.connect(audioContextInstance.destination)

  let currentSource
  return {
    async recordStart() {
      await waitMilliseconds(latencyMs)

      // create new stream source
      currentSource = audioContextInstance.createMediaStreamSource(stream)
      currentSource.connect(processor)
      
      // Clear the buffer
      cachedBuffer.copyToChannel(emptyBuffer, 0)

      // Start recording event
      processor.addEventListener('audioprocess', onAudioProcess)
    },

    async recordStop() {
      await waitMilliseconds(latencyMs)

      if (incomingData.length === 0) return

      // Disconnect audio stream from processor
      currentSource.disconnect(processor)

      // Copy contents of incomingData into cached buffer
      cachedBuffer.copyToChannel(new Float32Array(incomingData), 0)

      // Reset incoming data array
      incomingData = []

      // Stop listening
      processor.removeEventListener('audioprocess', onAudioProcess)
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
