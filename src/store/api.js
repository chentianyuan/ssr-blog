import Axios from 'axios'
export function fetchText(){
    return new Promise((resolve,reject)=>{
        resolve('执行了fetchText')
    })
}
    
export function fetchSSR(){
    return new Promise((resolve,reject)=>{
        resolve('执行了fetchSSRAction')
    })
}

export function fetchNews(){
    return new Promise((resolve,reject)=>{
        // js动态生成的路径无法被url-loader解析到，如果你去build，会发现图片甚至不会打包输出到dist目录（webpack是按需打包的）。
        // webpack 不会解析 html 的内容,但是会寻找所有的 require ,并将require的内容搜寻后打包
        var testList = []
        var query = {
            "showapi_appid": 61452, //这里需要改成自己的appid
            "showapi_sign": '3215b32f963d43e4b2669722efa06614',  //这里需要改成自己的应用的密钥secret
        }
        var self = this
        Axios({
            method: 'post',
            dataType: 'json',
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            data: {
                // "showapi_timestamp": formatterDateTime(),
                "showapi_appid": 61452, //这里需要改成自己的appid
                "showapi_sign": '3215b32f963d43e4b2669722efa06614',  //这里需要改成自己的应用的密钥secret
                "page":1,
                "maxResult":"20"
            },
            url: 'http://route.showapi.com/341-1',
        }).then(res=>{
            res?resolve(res):reject()
        }).catch(err=>{
            reject(err)
        })
    })
}

function formatterDateTime(){
    var date=new Date()
    var month=date.getMonth() + 1
    var datetime = date.getFullYear()
            + ""// "年"
            + (month >= 10 ? month : "0"+ month)
            + ""// "月"
            + (date.getDate() < 10 ? "0" + date.getDate() : date
                    .getDate())
            + ""
            + (date.getHours() < 10 ? "0" + date.getHours() : date
                    .getHours())
            + ""
            + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                    .getMinutes())
            + ""
            + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                    .getSeconds());
    return datetime;
}