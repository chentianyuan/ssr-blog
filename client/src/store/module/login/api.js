export function getLogin () {
  return new Promise((resolve, reject) => {
    // js动态生成的路径无法被url-loader解析到，如果你去build，会发现图片甚至不会打包输出到dist目录（webpack是按需打包的）。
    // webpack 不会解析 html 的内容,但是会寻找所有的 require ,并将require的内容搜寻后打包
    setTimeout(() => {
      resolve('测试')
    }, 1000)
  })
}
