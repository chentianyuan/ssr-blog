'use strict'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length})

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    // if (options.extract) {
    //   return [MiniCssExtractPlugin.loader, ...loaders]
    // } else {
    //   return ['vue-style-loader'].concat(loaders)
    // }
    return ['vue-style-loader'].concat(loaders)
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    less: generateLoaders('less'),
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}
// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

exports.happyUtil = (happypackList, baseConfig) => {
  let { rules } = baseConfig.module
  baseConfig.module.rules = rules.map(rule => {
    let loader = rule.loader || ''
    let fullLoader = loader.split('?')[0]
    if (fullLoader && happypackList.includes(fullLoader)) {
      let loaderName = fullLoader.split('-')[0]
      let happpackId = `${loaderName}`
      let opts = {
        id: happpackId,
        loaders: [{loader}],
        // 共享进程池
        threadPool: happyThreadPool,
        // happypack输出日志
        verbose: true
      }
      rule.options && Object.assign(opts.loaders[0], {
        // 将options传入happypack
        options: rule.options
      })
      baseConfig.plugins.push(new HappyPack(opts))
      // 删除原rule中的options
      delete rule.options
      rule.loader = `happypack/loader?id=${happpackId}`
    }
    return rule
  })
  return baseConfig
}
