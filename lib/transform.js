const fs = require('fs')
const path = require('path')

/**
 * 将待分析文件夹中所有 filename.txt 文件除去不必要标签，生成 filename.txt-regex.js，输出到同文件夹内
 * @param {String} sourceDir
 * @return {Boolean} 0 表示未处理或未成功去除， 1 表示成功
 */
function removeUselessTag (sourceDir) {
  if (!(typeof sourceDir === 'string') || !fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
    return 0
  }
  let files = fs.readdirSync(sourceDir)
  files = files.filter(file => file.match(/\.txt$/))
  if (!files.length === 0) {
    return 0
  }
  files = files.map(file => {
    return path.join(sourceDir, file)
  })
  if (files.length) {
    files.forEach(file => {
      let content = fs.readFileSync(file, 'utf8')
      let pattern = /(?<=<script>)[\s\S]*?(?=<\/script>)/gi // 匹配 <script></script> 标签
      let regex = content.match(pattern)
      let targetFile = path.join(file + '-regex.js')
      if (fs.existsSync(targetFile)) {
        fs.unlinkSync(targetFile)
      }
      regex.forEach(ele => {
        fs.appendFileSync(targetFile, ele.replace(/\\/gi, '')) // 去除转义字符 \
      })
    })
  }
  return 1
}

module.exports = {
  removeUselessTag: removeUselessTag
}
