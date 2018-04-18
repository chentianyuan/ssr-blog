
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