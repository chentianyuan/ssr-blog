const { resolve } = require('path')

function getDllFile () {
  const { name } = require(resolve('public/dll/manifest.json'))
  return `dll.${ name.split('_')[1] }.js`
}

module.exports = getDllFile
