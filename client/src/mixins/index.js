export default {
  filters: {
    getLocalTime (nS) {
      if (/(.*)T(.*)/.test(nS)) return RegExp.$1.replace(/-/g, '.')
    }
  }
}
