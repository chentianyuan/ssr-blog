/* eslint-disable */
export function map (ak) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 
      // 异步加载的js无法引入外部脚本
      // `https://api.map.baidu.com/api?v=2.0&ak=${ak}&s=1`
      `https://api.map.baidu.com/getscript?v=2.0&ak=${ak}&services=&t=20190123111209`
    document.body.appendChild(script)
    script.onload = function () {
      resolve(BMap)
    }
  })
}