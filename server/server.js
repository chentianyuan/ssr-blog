const express = require('express')
const Redis = require('ioredis')

const app = express()

let redis = new Redis(6379, '127.0.0.1')

redis.set('hello', 'node-redis')

redis.get('hello', (err, result) => {
  console.log(result)
})

app.listen(7777)
console.log("Express application is up and running on port 7777")
