# Figma build project

## This project uses

* `pnpm` - 7.13.4
* `node` - 18.15.0

## Dev process

1. Get npm token from private registry (npm, github, gitlab)
2. Set this npm token `npm config set '//registry.npmjs.org/:_authToken' "${NPM_TOKEN}"`
3. Verify if the npm token is set within the config with `npm config list | grep _authToken`
4. Login to your private registry `npm login --scope=@ColtHands --registry=https://npm.pkg.github.com`
   1. Input your login and password (`NPM_TOKEN`) in case of github
5. Create `.npmrc` file with similar contents where `NPM_TOKEN` is your token from registry (npm, github, gitlab)

```bash
@colthands:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=NPM_TOKEN
```
