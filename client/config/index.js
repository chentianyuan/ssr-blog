const isProd = process.env.NODE_ENV
module.exports = isProd ? require('./config.prod') : require('./config.dev')