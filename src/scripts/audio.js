/*
  records one stream at a time and retrieves it
*/

const mediaConstraints = { audio: true }
let recorder = undefined
let chunks = []

export const getMedia = () => navigator.mediaDevices.getUserMedia(mediaConstraints)
.catch((err) => {
  console.log(`The following gUM error occured: ${err}`);
})

export const record = (stream) => {
  if (!recorder) recorder = new MediaRecorder(stream)
  recorder.ondataavailable = e => chunks.push(e.data)
}

export const stop = () => {
  if (!recorder) console.error('Tried to stop an undefined recorder')
  recorder.stop()
}

const resetChunks = () => {
  chunks = []
}

export const getChunkData = () => {
  const $audio = document.createElement('audio')
  const audioBlob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
  $audio.src = window.URL.createObjectURL(audioBlob)
  resetChunks()
  return $audio
}
