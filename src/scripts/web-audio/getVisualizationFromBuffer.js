const splitArrayBy = (array, resolution) => {
  const bars = []
  let lastI = 0
  for (let i = 0; i < array.length; i++) {
    if (i % resolution === 0 && i > 0) {
      bars.push(array.slice(lastI, i))
      lastI = i
    }
  }
  if (lastI < array.length) {
    bars.push(array.slice(lastI))
  }
  return bars
}

const linearTransform = (val, startA, endA, startB, endB) => {
  const adjustedVal = val - startA

  const aRange = endA - startA
  const bRange = endB - startB
  const ratio = bRange / aRange

  return (adjustedVal * ratio) + startB
}

const sum = (arr) => arr.reduce((acc, curr) => acc + curr, 0)

const rootMeanSquare = (array) => {
  if (array.length === 1) return array[0]
  const squares = array.map(num => Math.pow(num, 2))
  const arithmeticMean = sum(squares) / array.length
  return Math.sqrt(arithmeticMean)
}

const average = (array) => sum(array) / array.length

const getBarsPositive = (buffer, width, height) => {
  const resolution = Math.max(Math.floor(buffer.length / width), 1)  // how many buffer nums in a pixel
  const bars = splitArrayBy(buffer, resolution)
  .map(rootMeanSquare)
  const numToHeight = num => linearTransform(num, 0, 1, 0, height)
  return bars.map(numToHeight)
}

const getBarsPosNeg = (buffer, width, height) => {
  const resolution = Math.max(Math.floor(buffer.length / width), 1)  // how many buffer nums in a pixel
  const bars = splitArrayBy(buffer, resolution).map(average)
  const numToHeight = num => linearTransform(num, -1, 1, 0, height)
  return bars.map(numToHeight)
}

module.exports = getBarsPosNeg


