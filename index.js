const path = require('path')
const program = require('commander')
const fs = require('fs')
const pkg = require(path.resolve(__dirname, 'package.json'))
const templates = require('./templates')

module.exports = async () => {
  program
    .version(pkg.version)
    .option('-f, --function <name>', 'The name of the Cloud Function.')
    .option('-s, --synopsis <description>', 'The synopsis of the Cloud Function.')
    .parse(process.argv)

  const cwd = process.cwd()

  const functionName = program.function || '{NAME REQUIRED}'
  const synopsis = program.synopsis || '{SYNOPSIS REQUIRED}'

  //
  // Generate files
  //
  const apiTemplate = templates.api
    .replace(/{function}/g, functionName)

  const pkgFriendlyName = functionName.toLowerCase().replace(/\s/g, '-')

  const packJsonTemplate = templates
    .packagejson
    .replace(/{functionName}/g, pkgFriendlyName)
    .replace(/{description}/g, synopsis)

  const readmeTemplate = templates
    .readme
    .replace(/{synopsis}/g, synopsis)

  try {
    fs.writeFileSync(path.join(cwd, 'index.js'), apiTemplate)
  } catch (err) {
    console.error(`Failed to create the index.js file: ${err.message}`)
    return { err }
  }

  try {
    fs.writeFileSync(path.join(cwd, 'README.md'), readmeTemplate)
  } catch (err) {
    console.error(`Failed to create the README file: ${err.message}`)
    return { err }
  }

  try {
    fs.writeFileSync(path.join(cwd, '.gcloudignore'), templates.gcloudignore)
  } catch (err) {
    console.error(`Failed to create the .gitignore file: ${err.message}`)
    return { err }
  }

  try {
    fs.writeFileSync(path.join(cwd, '.gitignore'), templates.gitignore)
  } catch (err) {
    console.error(`Failed to create the .gitignore file: ${err.message}`)
    return { err }
  }

  try {
    fs.writeFileSync(path.join(cwd, 'package.json'), packJsonTemplate)
  } catch (err) {
    console.error(`Failed to create the package.json file: ${err.message}`)
    return { err }
  }

  try {
    fs.writeFileSync(path.join(cwd, 'test.js'), templates.test)
  } catch (err) {
    console.error(`Failed to create the test.js file: ${err.message}`)
    return { err }
  }

  return { data: '✅ Successfully built templates.' }
}
