var plato = require('plato')

// 待分析项目目录
var files = [
  './example/seed/'
]

// 输出文件夹
var outputDir = './report/seed-report'

// plato配置
var options = {
  'recurse': true,
  'title': 'plato mini program'
}

// 回调函数
var callback = function () {
  console.log('success:', '输出文件路径：', outputDir)
}

// 主执行函数
plato.inspect(files, outputDir, options, callback)
