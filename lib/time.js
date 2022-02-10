export function millis(mills) {
  const minutes = Math.floor(mills / 60000)
  const secounds = ((mills % 60000) / 1000).toFixed(0)

  return secounds == 60
    ? minutes + 1 + ':00'
    : minutes + ':' + (secounds < 10 ? '0' : '') + secounds
}
