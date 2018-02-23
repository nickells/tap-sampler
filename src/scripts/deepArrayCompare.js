export default (init, compare) => {
  if (init.length !== compare.length) return false

  for (let i = 0; i < init.length; i++) {
    if (init[i] !== compare[i]) return false
  }

  return true
}
