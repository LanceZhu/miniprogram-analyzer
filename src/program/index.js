const fse = require('fs-extra')
const path = require('path')
const { fork } = require('child_process')

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

  const getPlatoReport = new Promise((resolve, reject) => {
    const childPlato = fork(require.resolve('./javascript/plato'))
    childPlato.on('message', message => {
      console.log(typeof message)
      resolve({
        message
      })
    })

    const files = [mpDir]
    const platoOutputDir = path.join(outputDir, 'plato')
    const { platoOptions = {
      recurse: true
    } } = options

    childPlato.send({
      cmd: 'start',
      options: [files, platoOutputDir, platoOptions]
    })
  })

  const getUsedComponents = new Promise((resolve, reject) => {
    const childGetUsedComponents = fork(require.resolve('./html/component'))
    childGetUsedComponents.on('message', message => {
      console.log(typeof message)
      resolve({
        message
      })
    })
    childGetUsedComponents.send({
      cmd: 'start',
      options: [mpDir]
    })
  })

  const reports = await Promise.all([getPlatoReport, getUsedComponents])
  const [platoReport, usedComponents] = reports

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
