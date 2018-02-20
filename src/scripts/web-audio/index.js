import makeSample from './makeSample'


const mediaConstraints = { audio: true }
const context = new AudioContext()
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
