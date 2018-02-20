const waitMilliseconds = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default function makeSample(_index, audioContextInstance, scriptProcessor){
  const index = _index
  const secondsLength = 3
  const channels = 1
  const cachedBuffer = audioContextInstance.createBuffer(channels, audioContextInstance.sampleRate * secondsLength, audioContextInstance.sampleRate)
  let node = undefined

  const latencyMs = audioContextInstance.baseLatency * 1000

  // hold data here as it comes in
  let incomingData = []

  const onAudioProcess = (audioProcessingEvent) => { 
    const array = Array.from(audioProcessingEvent.inputBuffer.getChannelData(0))
    incomingData.push(...array)
  }

  const emptyBuffer = new Float32Array(audioContextInstance.sampleRate * secondsLength).fill(0)

  return {
    async recordStart() {
      await waitMilliseconds(latencyMs)
      
      // Clear the buffer
      cachedBuffer.copyToChannel(emptyBuffer, 0)

      // Start recording event
      scriptProcessor.addEventListener('audioprocess', onAudioProcess)
    },

    async recordStop() {
      await waitMilliseconds(latencyMs)
      
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
