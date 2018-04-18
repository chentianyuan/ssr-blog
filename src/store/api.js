
export default { 
    fetchText(){
        return new Promise((resolve,reject)=>{
            resolve('执行了fetchText')
        })
    },
    fetchSSR(){
        return new Promise((resolve,reject)=>{
            resolve('执行了fetchSSRAction')
        })
    }
 }