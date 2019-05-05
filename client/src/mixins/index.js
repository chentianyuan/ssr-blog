export default {
  filters: {
    getLocalTime (nS) {
      nS = new Date(nS).toLocaleString()
      if (/(.*)(上午|下午)(.*)/.test(nS)) return RegExp.$1.replace(/\//g, '.')
    }
  }
}
