const { exec } = require('child_process')
require('dotenv').config()

exec('pnpm publish --no-git-checks', process.env, (err, stdout, stderr) => {
    if(err || stderr) console.error(err || stderr)

    console.log(stdout)
})
