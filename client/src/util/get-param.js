// 获取参数名的name的urlparam
function getQueryString (name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return decodeURIComponent(r[2])
  }
  return null
}

// 模拟loadsh的get函数
let _ = Object.create(null)
_.get = function (object, keys, def = '') {
  keys = keys.split('.')
  if (Object.prototype.toString.call(object) !== '[object Object]') {
    return def
  }
  if (keys.length === 1 && object.hasOwnProperty(keys[0])) {
    return object[keys[0]]
  }
  return _.get(object[keys[0]], keys.slice(1).join('.'), def)
}

export {
  getQueryString,
  _
}
