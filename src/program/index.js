const plato = require('plato')
const fse = require('fs-extra')
const path = require('path')

const getUsedComponents = require('./html/component')

const inspect = async (mpDir, reportDir, options = {}) => {
  const appJSONPath = path.join(mpDir, 'app.json')
  if (!fse.existsSync(appJSONPath)) {
    console.warn('Error: app.json is not exist!')
    console.warn(`  mpDir: ${mpDir}`)
    return
  }

  const appJSON = fse.readJSONSync(appJSONPath)
  const mpPages = appJSON.pages

  const hasCloudFunction = fse.existsSync(path.join(mpDir, 'cloudfunctions'))

  const outputDir = reportDir || path.join(process.cwd(), 'report', path.basename(mpDir))

  fse.ensureDirSync(outputDir)
  fse.emptyDirSync(outputDir)

  const { platoOptions = {
    recurse: true
  } } = options

  const platoReport = await new Promise((resolve, reject) => {
    const files = [mpDir]
    const platoOutputDir = path.join(outputDir, 'plato')
    plato.inspect(files, platoOutputDir, platoOptions, report => {
      resolve(report)
    })
  })

  const usedComponents = await getUsedComponents(mpDir)

  const report = {
    pages: mpPages,
    hasCloudFunction,
    components: usedComponents,
    plato: platoReport
  }

  fse.writeFileSync(path.join(outputDir, 'report.json'), JSON.stringify(report, null, 2))

  console.log(`报告输出至：${outputDir}`)

  return report
}

module.exports = {
  inspect
}
