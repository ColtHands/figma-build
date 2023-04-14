# Figma build project

* This package fetches figma styles, parses them into front-end readable formats and outputs them into various formats `css`, `css-variables`, `commonjs`, `json`, etc.

## Usage

### Through `npx`

`pnpx figma-build theme --accessToken <YOUR_FIGMA_ACCESS_TOKEN> --fileId <YOUR_FIGMA_FILE_ID> --outputFormat esm`

Or yarn dlx

`yarn dlx figma-build...`

If no `outputFormat` specified the styles would be built as `theme.json`

### As a global script

* `pnpm install figma-build -g`
* `yarn global add figma-build`

## Arguments

### *`"command"`*

The first ever argument you need to pass is what kind feature from figma you're looking for, currently we're only supporting `theme`, but `components` and `images` are in the workings.

*Usage:* `figma-build theme`

### `--acessToken`

This if your figma's access token, you can obtain it when in browising file screen -> your profile -> settings -> account -> Personal access tokens.

The script will not work without it.

*Usage:* `figma-build theme --accessToken <TOKEN>`

### `--fileId`

This is your figma's document id or rather file id.
When you open your figma document you can find your file id in the url of that file

In this URL `https://www.figma.com/file/P2oVdik0Q0pUoIxRIzaMjK/API_STUFF?t=Izh75bvDR8rlV1Yq-0` the file would be `P2oVdik0Q0pUoIxRIzaMjK`

*Usage:* `figma-build theme --accessToken <TOKEN> --fileId <FILE_ID>`

### `--outputFormat`

Enum of `[json | stdout | esm | commonjs | css | css-variables | sass | scss ]`

Specify the format of the parsed figma theme:

* `stdout` will write theme styles in json format to your console
* `json` will write theme styles in json format to `.json` file
* `esm` will write theme styles in `json` format to a `.js` file as an ecmascript module, so you could import those styles further.
* `commonjs` will write theme styles in `json` format to a `.js` file as an commonjs module, so you could require those styles further, mostly used with node.
* `css` will write theme styles in css format as each of the styles being its own classname.
* `css-variables` will write theme styles in css format each of the styles being its own css variable

*Usage:* `figma-build theme --accessToken <TOKEN> --fileId <FILE_ID> --outputFormat esm`

### `--filename`

Specify the output filename, by default its `theme.json`

### `--outputPath`

Path to where file would be written in.

## Contributing

1. Obtain `accessToken` from your figma settings -> account.
2. Set this `accessToken` as an argument in `pnpm dev` script inside `package.json`
   1. Make sure not to commit or expose your `accessToken`, for that you can create already git-ignored `Makefile`, and pass you secrets there:

    ```bash
    dev:
        pnpm dev --accessToken <YOUR_FIGMA_ACCESS_TOKEN> --fileId <YOUR_FIGMA_FILE_ID>
    ```

3. Find out file from which you want to get those styles from
   * In this URL `https://www.figma.com/file/P2oVdik0Q0pUoIxRIzaMjK/API_STUFF?t=Izh75bvDR8rlV1Yq-0` the file would be `P2oVdik0Q0pUoIxRIzaMjK`

## Roadmap

* Cover everything with tests
* Finish theme parsing
* Consider different style theme names (eg `theme.name`, `theme/name`, `themeName`)
* Finish all other format outputs.
* Rewrite `esm` and `commonjs` to a proper solution.
* Consider outputting not only theme styles, but components as well
