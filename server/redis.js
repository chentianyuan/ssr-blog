const express = require('express')
const redis = require('redis')

const app = express()

// redis客户端
const client = redis.createClient(6379, '127.0.0.1')

// 简单读写
// hashkey 为表名
// hashvalue: 1为键，也就是哈希名，redis里称为域
// 123456 为hashvale: 1键对应的值
// client.hsetnx('hash key', 'hashvalue: 1', '123456', redis.print)
// client.hsetnx('hash key', 'hashvalue: 2', '78910', redis.print)
// client.hsetnx(['hash key', 'hashvalue: 3', 'zzzs'], redis.print)
// client.hkeys('hash key', function (err, replys) {
//   console.log('哈希表长度' + replys.length)
//   replys.forEach((reply, i) => {
//     client.hget('hash key', reply, function (err, val) {
//       console.log(`hash表第${reply}键对应的value为${val}`)
//     })
//   })
// })

// 通用读写
// client.hmset('hash key', {
//   "hashvalue: 1": "123456",
//   "hashvalue: 2": "78910",
//   "hashvalue: 3": "zzzs"
// })
// client.hgetall('hash key', function (err, replyObject) {
//   for (let [key, val] of Object.entries(replyObject)) {
//     console.log(`hash表中${key}域对应的value为${val}`)
//   }
// })

// 发布订阅
const sub = redis.createClient()
const pub = redis.createClient()
let msg_count = 0
sub.on('subscribe', function (channel, count) {
  pub.publish("a nice channel", "I am sending a message.")
  pub.publish("a nice channel", "I am sending a second message.")
  pub.publish("a nice channel", "I am sending my last message.")
})

sub.on('message', function (channel, message) {
  console.log("sub channel " + channel + ": " + message)
  msg_count++
  if (msg_count === 3) {
    sub.unsubscribe()
    sub.quit()
    pub.sub()
  }
})

sub.subscribe('a nice channel')

app.listen(7777)
console.log("Express application is up and running on port 7777")
