module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  // 使用standard提供的规范
  // 使用eslint-plugin-vue插件检测
  extends: [ 'plugin:vue/essential', 'standard' ],
  rules: {
    // 在这里可以添加自定义规则
    // 'no-console': process.env.NODE_ENV === 'production' ? 'on' : 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prefer-promise-reject-errors': 'off'
  }
}