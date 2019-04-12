const { execSync: exec } = require('child_process')
const path = require('path')

const clean = async () => {
  const apijs = path.resolve(__dirname, `./index.js`)
  const gitignore = path.resolve(__dirname, `./.gitignore`)
  const gcloudignore = path.resolve(__dirname, `./.gcloudignore`)
  const packagejson = path.resolve(__dirname, `./package.json`)
  const readme = path.resolve(__dirname, `./README.md`)
  const test = path.resolve(__dirname, `./test.js`)

  try {
    exec(`rm -f ${apijs}`)
    exec(`rm -f ${gitignore}`)
    exec(`rm -f ${gcloudignore}`)
    exec(`rm -f ${packagejson}`)
    exec(`rm -f ${readme}`)
    exec(`rm -f ${test}`)
  } catch (ex) {
    const message = `🛑 Failed to clean.`
    console.error(message, String(ex.stdout))
  }
}

module.exports = clean
