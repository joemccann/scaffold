const { stripIndent } = require('common-tags')

const api = stripIndent`
  exports['{functionName}'] = async (req, res) => {
    const {
      body,
      query
    } = req

    //
    // TODO: Add Logic 
    //

    if (err) return res.send({ err })

    return res.send({ data })
  }
`

const readme = stripIndent`
  # SYNOPSIS

  {synopsis}

  ## REQUIREMENTS

  1. A Google Cloud Account.
  2. Billing Enabled.
  3. API Access Enabled.
  4. \`gcloud\` CLI installed and in your \`$PATH\`.
  5. A preferred configuration created ( \`gcloud init\` ).

  ## USAGE

  \`\`\`sh
  curl https://\${DEFAULT_REGION}-\${PROJECT}.cloudfunctions.net/{functionName}?
  \`\`\`

  Or, if you prefer a \`POST\`:

  \`\`\`sh
  curl https://\${DEFAULT_REGION}-\${PROJECT}.cloudfunctions.net/{functionName} --data '{"": ""}' -H "Content-Type: application/json"
  \`\`\`

  The expected response:

  \`\`\`js
  {
    "data": {
    }
  }
  \`\`\`

  Or in the case there is a failure:

  \`\`\`js
  {
    "err": ""
  }
  \`\`\`

  ## API

  \`\`\`sh
  curl https://\${DEFAULT_REGION}-\${PROJECT}.cloudfunctions.net/{functionName}?
  curl https://\${DEFAULT_REGION}-\${PROJECT}.cloudfunctions.net/{functionName}?
  curl https://\${DEFAULT_REGION}-\${PROJECT}.cloudfunctions.net/{functionName}?
  curl https://\${DEFAULT_REGION}-\${PROJECT}.cloudfunctions.net/{functionName}?
  \`\`\`

  ## DEPLOY

  First, fork or clone this repo, then:

  \`\`\`sh
  npm i
  \`\`\`

  Now, deploy it GCP, run the following command in the root of this repository:

  \`\`\`sh
  gcloud functions deploy {functionName} --runtime nodejs10 --trigger-http --memory 128MB
  \`\`\`

  You should receive a YAML like response in your terminal including the URL for the Cloud Function.

  ## AUTHORS

  - [Joe McCann](https://twitter.com/joemccann)

  ## LICENSE

  MIT
`
const packagejson = stripIndent`
  {
    "name": "{functionName}",
    "version": "1.0.0",
    "description": "{description}",
    "main": "index.js",
    "scripts": {
      "pretest": "standard",
      "test": "node test.js"
    },
    "repository": {
      "type": "git",
      "url": "git+https://github.com/joemccann/{functionName}.git"
    },
    "keywords": [],
    "author": "Joe McCann",
    "license": "MIT",
    "bugs": {
      "url": "https://github.com/joemccann/{functionName}/issues"
    },
    "homepage": "https://github.com/joemccann/{functionName}#readme",
    "dependencies": {},
    "devDependencies": {
      "standard": "^12.0.1",
      "tape": "^4.10.1"
    }
  }
`
const gitignore = stripIndent`
  .DS_Store
  node_modules
`

const test = stripIndent`
  const test = require('tape')
  const { '{functionName}': XXX } = require('.')

  //
  // Create a stubbed response object
  //
  const res = {
    send: (body) => {
      return body
    }
  }

  const { error, log, dir } = console

  test('sanity', t => {
    t.ok(true)
    t.end()
  })

  test('', async t => {
    const { err, data } = await XXX()
    if (err) {
      error(err)
      return t.end()
    }
    t.ok(data)
    t.end()
  })
`

const gcloudignore = stripIndent`
  .gcloudignore
  .git
  .gitignore
  node_modules
`

module.exports = {
  api,
  gitignore,
  gcloudignore,
  packagejson,
  readme,
  test
}
