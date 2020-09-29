const fs = require('fs')
const path = require('path')
const htmlparser2 = require('htmlparser2')
const globby = require('globby')
const object = require('lodash/object')
const tokens = require('./tokens')

const getUsedComponents = async (mpDir) => {
  const components = {}

  const globbyOptions = {
    cwd: mpDir ? mpDir : process.cwd()
  }
  const filePattern = '**/*.wxml'
  const htmlFiles = globby.sync([filePattern], globbyOptions)

  const next = async (fileIndex) => {
    if(fileIndex >= htmlFiles.length) {
      return components
    }

    const filePath = path.join(mpDir, htmlFiles[fileIndex])

    const htmlStream = fs.createReadStream(filePath)
    const parserStream = new htmlparser2.WritableStream({
      onopentagname (name) {
        components[name] = components[name] ? ++components[name] : 1 
      }
    })
    return new Promise((resolve, reject) => {
      htmlStream.pipe(parserStream).on('finish', async () => {
        resolve(await next(++fileIndex))
      })

    })
  }

  await next(0)

  return object.pick(components, tokens)
}

module.exports = getUsedComponents
