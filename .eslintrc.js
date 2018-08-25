module.exports = {
  // 使用airbnb提供的规范
  // 使用eslint-plugin-vue插件检测
  extends: [ 'plugin:vue/essential', 'airbnb-base' ],
  rules: {
    // 在这里可以添加自定义规则
    // 比如
    'no-console': process.env.NODE_ENV === 'production' ? 'on' : 'off'
  }
}