import makeSample from './makeSample'


const mediaConstraints = { audio: true }
const context = new AudioContext()
const samples = []

export const getMedia = async () => {
  const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints)

  for (let i = 0; i < 9; i++) {
    samples[i] = makeSample(i, context, stream)
  }
}

export const recordStart = (i) => {
  console.log(samples)
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
