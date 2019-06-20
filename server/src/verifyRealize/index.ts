// commonjs导出的包兼容
import jwt = require('jsonwebtoken')

const needLoginMethod = {
  'post': true
}
const whiteApiList = [
  '/api/user/verify',
  '/api/post/pagination',
  '/api/post/onepost',
  '/api/comment/insertComment',
  '/api/post/views',
  '/api/post/pagination/withtag',
  '/api/post/likes',
  '/api/post/comments',
  '/api/view/addView'
]
export default function (req, res, next) {
  let method = req.method.toLowerCase()
  let path = req.path

  if (!needLoginMethod[method] || whiteApiList.includes(path)) {
    // 跳过身份验证
    next()
  } else {
    const token = req.headers.authorization
    if (!token) {
      res.json({
        code: 401,
        hasError: true,
        msg: '用户未登录'
      })
    } else {
      jwt.verify(token, 'ssh', (err, decoded) => {
        if (err) {
          res.json({
            code: 401,
            hasError: true,
            msg: '身份验证过期，请重新登录'
          })
        } else {
          req.decoded = decoded
          next()
        }
      })
    }
  }
}
