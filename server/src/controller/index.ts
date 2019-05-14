import * as path from 'path'
// glob模块解析路径模型并读取文件
const glob = require('glob')

const controllers = []
// 匹配当前目录下的所有ts文件
glob(__dirname + '/*.ts', function (err, files) {
  files.forEach(file => {
    // 返回的是匹配的文件绝对路径数组，通过file.parse(ph)解析成file对象
    // 排除自身
    if(path.parse(file).name !== 'index') {
      // const controller = require(file).default
      import(file).then(controller => {
        controllers.push(controller.default)
      })
    }
  })
})

export default controllers