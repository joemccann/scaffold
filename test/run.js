const { execSync: exec } = require('child_process')
const path = require('path')
const clean = require('./clean')
const test = require('tape')
const fs = require('fs')

test.onFinish(async () => {
  await clean()
})

test('sanity', t => {
  t.ok(true)
  t.end()
})

test('build api', async t => {
  const cwd = process.cwd()
  const command = path.resolve(__dirname, `../bin/scaffold`)
  const params = [`-f`, `foo`, '-s', '"Test synopsis."'].join(' ')
  const paths = {
    api: path.join(cwd, `index.js`),
    gitignore: path.join(cwd, `.gitignore`),
    gcloudignore: path.join(cwd, `.gcloudignore`),
    packagejson: path.join(cwd, 'package.json'),
    readme: path.join(cwd, `README.md`),
    test: path.join(cwd, `test.js`)
  }

  try {
    exec(`${command} ${params}`)
  } catch (ex) {
    const message = `🛑 Failed to execute build api command.`
    console.error(message, String(ex.stdout))
    t.end(String(ex.stdout))
  }

  //
  // Confirm directories and files exist
  //
  t.true(fs.existsSync(paths.api))
  t.true(fs.existsSync(paths.gitignore))
  t.true(fs.existsSync(paths.gcloudignore))
  t.true(fs.existsSync(paths.packagejson))
  t.true(fs.existsSync(paths.readme))
  t.true(fs.existsSync(paths.test))
  t.end()
})
