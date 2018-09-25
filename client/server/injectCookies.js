module.exports = function injectCookies(req, res, next) {
  // 每次请求都判断cookie是否存在，并重新设置cookie
  global.cookies = {}
  if (req.cookies._blogSid_ && !global.cookies._blogSid_) {
    global.cookies._blogSid_ = req.cookies._blogSid_
  }
  next()
}