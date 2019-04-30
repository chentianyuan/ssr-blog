const isProd = process.env.NODE_ENV === 'production'
module.exports = isProd ? require('./config.prod') : require('./config.dev')