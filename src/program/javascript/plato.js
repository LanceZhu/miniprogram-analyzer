const plato = require('plato')

const getPlatoReport = async (files, outputDir, options) => {
  const platoReport = await new Promise((resolve, reject) => {
    plato.inspect(files, outputDir, options, report => {
      resolve(report)
    })
  })
  return platoReport
}

process.on('message', async message => {
  const { options } = message
  const platoReport = await getPlatoReport(...options)

  process.send(platoReport)
  process.exit()
})

module.exports = getPlatoReport
