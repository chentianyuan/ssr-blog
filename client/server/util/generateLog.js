const log4js = require('log4js')
// 获取写入日志文件的logger，未指定类别则使用默认类别
const defaultLog = log4js.getLogger()
function fileLog ({req, url}) {
  const data = {
    // 根据req.header可以得到几乎所有本次请求信息
    // otherLog
    url: url,
    params: {
    clientIP: req.headers['x-forwarded-for'] || '', // 客户端ip
    userAgent: req.headers['user-agent'] || '' // 用户浏览器类别版本
    }
  }
  defaultLog.info(data)
}
function generateLog (context) {
  // console.log({ message: '控制台log' }) 这个是输出到控制台的
  // 使用 log4js.getLogger 获取的 logger才会输出到日志文件
  fileLog(context)
}
module.exports = generateLog