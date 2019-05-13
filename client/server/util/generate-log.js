const log4js = require('log4js')
// 获取写入日志文件的logger，未指定类别则使用默认类别
const ordinaryLog = log4js.getLogger('ssr-blog')

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

function generateLog (context) {
  let { req = {}, url } = context
  const data = {
    // 根据req.header可以得到几乎所有本次请求信息
    // otherLog
    url: url || location.href,
    clientIP: _.get(req, 'headers.x-forwarded-for', '') || _.get(req, 'ip', ''), // 客户端ip
    userAgent: _.get(req, 'headers.user-agent', ''), // 用户浏览器类别版本
    host: _.get(req, 'headers.host', ''),
    cookies: JSON.stringify(_.get(req, 'cookies', ''))
  }

  if (context) {
    ordinaryLog.info(data)
  } else {
    console.log(data)
  }
}

module.exports = {
  generateLog
}