// 添加server缓存
const LRU = require('lru-cache')
const cacheDir = new LRU({
  max: 500,
  maxAge: 1000 * 60 * 60 // 缓存时间1个小时
})
const regExp = new RegExp(/[\?\#]/)
const BlackPageList = [
  '/leaveBoard',
  '/'
]
let cacheKey = ''

let cacheMiddleware = function (req, res, next) {
  let hitHTML = cacheDir.get(cacheKey)
  cacheKey = req.url
  if (hitHTML) {
    res.setHeader('lru-cache', 'yes')
    res.type('html').send(hitHTML)
  } else {
    next()
  }
}

let cachePage = function (html) {
  return new Promise(resolve => {
    if (!regExp.test(cacheKey) && !BlackPageList.includes(cacheKey)) {
      cacheDir.set(cacheKey, html)
    }
    resolve(html)
  })
}

module.exports = {
  cacheMiddleware,
  cachePage
}