# Figma build project

## This project uses

* `pnpm` - 7.13.4
* `node` - 18.15.0

## Dev process

1. Obtain `accessToken` from your figma settings/account.
2. Set this `accessToken` as an argument in `pnpm dev` script inside `package.json`
3. Find out file from which you want to get those styles from
   * In this URL `https://www.figma.com/file/P2oVdik0Q0pUoIxRIzaMjK/API_STUFF?t=Izh75bvDR8rlV1Yq-0` the file would be `P2oVdik0Q0pUoIxRIzaMjK`