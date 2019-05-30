let plato = require('plato')
let { removeUselessTag } = require('./lib/transform')

// 将文件夹内所有 filename.txt 文件去除不必要标签，并生成对应的 filename.txt-regex.js
removeUselessTag('./example/snippet')

var files = [
  './example/snippet'
]

var outputDir = './report/snippet'

var options = {
  'recurse': true,
  'title': 'plato mini program'
}

var callback = function () {
  console.log('success:', '输出文件路径：', outputDir)
}

try {
  plato.inspect(files, outputDir, options, callback)
} catch (err) {
  console.log(err)
}
