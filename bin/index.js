const { program } = require('commander')
const { inspect } = require('../src/program')

program
  .version('0.0.1')
  .name('mp-analyze')

program
  .command('analyze [mpDir]')
  .option('-i, --input [mp directory]', 'miniprogram directory path')
  .option('-o, --output [report directory]', 'report directory path')
  .action(async (mpDir, options) => {
    mpDir = mpDir || options.input || process.cwd()
    reportDir = options.output
    await inspect(mpDir, reportDir)
  })

program.parse(process.argv);
