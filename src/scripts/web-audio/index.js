import makeSample from './makeSample'
import audioStore from './audioStore'

const mediaConstraints = { audio: true }
const context = new AudioContext()
const samples = []

export const getMedia = async () => {
  const userMedia = await navigator.mediaDevices.getUserMedia(mediaConstraints)

  for (let i = 0; i < 9; i++) {
    samples[i] = makeSample(i, context, userMedia)
  }
}

export const recordStart = (i) => {
  return samples[i].recordStart()
}

export const recordStop = (i) => {
  if (!i) samples.forEach(sample => sample.recordStop())
  else samples[i].recordStop()
}

export const playAudio = (i) => {
  return samples[i].playAudio()
}

export const stopAudio = (i) => {
  return samples[i].stopAudio()
}

export const getBuffer = (i) => {
  return audioStore[i]
}
