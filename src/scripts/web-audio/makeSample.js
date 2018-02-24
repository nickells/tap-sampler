import audioStore from './audioStore'

const waitMilliseconds = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default function makeSample(_index, audioContextInstance, userMedia){
  const index = _index
  const secondsLength = 3
  const channels = 1
  const cachedBuffer = audioContextInstance.createBuffer(channels, audioContextInstance.sampleRate * secondsLength, audioContextInstance.sampleRate)
  
  // Create new processor to copy our data
  const processor = audioContextInstance.createScriptProcessor(512, 1, 1);
  processor.connect(audioContextInstance.destination)
  
  // Hold the temporary buffersource here
  let node = undefined
  
  // hold data here as it comes in
  let incomingData = []

  const latencyMs = audioContextInstance.baseLatency * 1000

  const REMOVE_SILENCE = true

  // Save incoming data
  const onAudioProcess = (audioProcessingEvent) => {
    const array = Array.from(audioProcessingEvent.inputBuffer.getChannelData(0))
    if (REMOVE_SILENCE && Math.max(...array) < 0.1 ) return
    incomingData = incomingData.concat(array)
  }

  const emptyBuffer = new Float32Array(audioContextInstance.sampleRate * secondsLength).fill(0)


  const preparePlayback = () => {
    // Create a new buffer source
    node = audioContextInstance.createBufferSource()

    // Attach our cached buffer data to the buffer source
    node.buffer = cachedBuffer

    // Connect buffer to the destination
    node.connect(audioContextInstance.destination)
  }

  let currentSource
  return {
    async recordStart() {
      await waitMilliseconds(latencyMs)

      // create new stream source
      currentSource = audioContextInstance.createMediaStreamSource(userMedia)
      currentSource.connect(processor)
      
      // Clear the buffer
      cachedBuffer.copyToChannel(emptyBuffer, 0)

      // Start recording event
      processor.addEventListener('audioprocess', onAudioProcess)

      preparePlayback()
    },

    recordStop() {
      // await waitMilliseconds(latencyMs)

      if (incomingData.length === 0) return

      // Disconnect audio stream from processor
      currentSource.disconnect(processor)

      // Get data into a better array
      const floatArrayData = new Float32Array(incomingData)

      // Save the data for storage or visualiztion
      audioStore[index] = floatArrayData

      // Copy contents of incomingData into cached buffer
      cachedBuffer.copyToChannel(floatArrayData, 0)

      // Reset incoming data array
      incomingData = []

      // Stop listening
      processor.removeEventListener('audioprocess', onAudioProcess)

      // Set up playable buffer
      preparePlayback()
    },

    playAudio() {
      // Play
      if (!node) return
      node.start()
    },

    stopAudio(){
      if (!node) return
      try { node.stop() }
      catch(e){
        console.log('tried to stop a node that hasnt started')
      }
      preparePlayback()
    }
  }
}
