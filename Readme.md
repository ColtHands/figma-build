# Figma build project

## This project uses

* `pnpm` - 7.13.4
* `node` - 18.15.0

## Dev process

1. Obtain `accessToken` from your figma settings/account.
2. Set this `accessToken` as an argument in `pnpm dev` script inside `package.json`
3. Find out file from which you want to get those styles from
   * In this URL `https://www.figma.com/file/P2oVdik0Q0pUoIxRIzaMjK/API_STUFF?t=Izh75bvDR8rlV1Yq-0` the file would be `P2oVdik0Q0pUoIxRIzaMjK`
4. To debug the private package as binary you need to create `.npmrc` file with the following line `@colthands:registry=https://npm.pkg.github.com`

## Usage

### As an `npx` or `pnpx` without installation (both are similar)

`npx @colthands/figma-build --accessToken figd_8LymySpjTOr3YbRhrlrt98ZppFyCUrRyV4UP4eHF --file P2oVdik0Q0pUoIxRIzaMjK`

### Install globally (for now only from private repository)

* Currently there are mismatches within registries, and there is no normal way to install `figma-build` from a github registry and fallback to `npm` registry.
