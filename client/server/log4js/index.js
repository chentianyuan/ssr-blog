let log4js = require('log4js')
log4js.configure({
  // 是否使用pm2
  // pm2: false,
  // set this if you're using pm2 and have changed the default name of the NODE_APP_INSTANCE variable.
  // pm2InstanceVar: 'blog_test'
  // 附加器，有了等级和类别之后决定日志输出到哪里，相当于不同logger的配置options
  appenders: {
    // 默认appender是type: 'console'
    ordinaryLog: {
      type: 'dateFile',
      // 设置此日志类型,日志类型有类型限制的，以下是几种核心的附加器类型，他们有自己的默认配置
      // coreAppenders.set('console', require('./console'));
      // coreAppenders.set('stdout', require('./stdout'));
      // coreAppenders.set('stderr', require('./stderr'));
      // coreAppenders.set('file', require('./file'));
      // coreAppenders.set('dateFile', require('./dateFile'));
      level: 'trace', // 设置此类日志输出的最低级别
      maxLevel: 'error', // 设置此类日志输出的最高级别
      // appender: 'infoLog', // 附加另一附加器的所有属性
      filename: `logs/${new Date().toLocaleDateString().replace(/\//g, '-')}.access.log`, // 生成的日志文件名
      // 生成日志的格式，若想自定义格式加上type: pattern属性
      layout: {
        pm2: true,
        logDir: './logs',
        // 在 basic 的基础上给日志加上颜色，appender Console 默认使用的就是这个 layout
        // type: 'colored/coloured'
        type: 'pattern',
        // %d 应该是解析符 ？
        // %p 为日志等级
        // %c 为日志名
        // %m 为日志真实内容
        // %n 为换行
        pattern: '%d{yyyy-MM-dd hh:mm:ss} %p %m%n'
      },
      maxLogSize: 31457280 // 最大文件大小
    }
  },
  // 日志类别
  categories: {
    // 默认类别，必填，当获取log4js.getLogger()时，使用的就是默认类别
    default: {
      // 默认类型的附加器
      appenders: ['ordinaryLog'],
      level: 'trace'
    },
    'other-catetory': { appenders: ['ordinaryLog'], level: 'off' }
  }
})
// 获取日志输出器
// log4js.getLogger(日志类别，若为空，类别为默认default)
logger = log4js.getLogger('other-catetory')
module.exports = logger