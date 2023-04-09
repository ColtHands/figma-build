/**
 * Main arguments of package 
 * @param accessToken - figma access token
 * @param file - figma file to get data from
 */
export type Arguments = {
    accessToken: string,
    file: string,
    outputPath: string,
    filename: string,
    outputFormat: OutputFormat,
}

export enum OutputFormat {
    json = 'json',
    js = 'js',
    css = 'css'
}

export enum Commands {
    theme = 'theme',
    components = 'build'
}