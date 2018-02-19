/*
  records one stream at a time and stores it
*/

const mediaConstraints = { audio: true }
let recorder = undefined
let chunks = []
let streamInstance
const DEBUG = 1

const audioElements = {

}

for (let i = 0; i < 9; i++) {
  audioElements[i] = document.createElement('audio')
  document.body.appendChild(audioElements[i])
}

export const getMedia = () => navigator.mediaDevices.getUserMedia(mediaConstraints)
.then(stream => {
  streamInstance = stream
  return stream
})
.catch((err) => {
  console.log(`The following gUM error occured: ${err}`);
})

export const recordStart = (i) => {
  if (DEBUG) console.log('record start')
  if (!recorder) recorder = new MediaRecorder(streamInstance)
  recorder.start()
  recorder.ondataavailable = (e) => {
    chunks.push(e.data)
    const audioBlob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
    chunks = []
    audioElements[i].setAttribute('src', window.URL.createObjectURL(audioBlob))
    audioElements[i].load()
  }
}

export const recordStop = (i) => {
  if (DEBUG) console.log('record stop')
  if (!recorder) {
    console.error('Tried to stop an undefined recorder')
    return
  }
  if (recorder && recorder.state === 'inactive') return
  recorder.stop()
}


export const playAudio = (i) => {
  if (DEBUG) console.log('play', i)
  if (audioElements[i].src) audioElements[i].play()
}

export const stopAudio = (i) => {
  if (DEBUG) console.log('pause', i)
  if (audioElements[i].src) {
    audioElements[i].currentTime = 0
    audioElements[i].pause()
  }
}
