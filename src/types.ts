export type FigmaRestMethods = 'file' | 'files' | 'images'

export enum StyleType {
    FILL = "FILL",
    EFFECT = "EFFECT",
    TEXT = "TEXT",
}

export enum FillType {
    SOLID = "SOLID",
    GRADIENT_LINEAR = "GRADIENT_LINEAR",
    GRADIENT_RADIAL = "GRADIENT_RADIAL",
    GRADIENT_ANGULAR = "GRADIENT_ANGULAR",
    GRADIENT_DIAMOND = "GRADIENT_DIAMOND",
    IMAGE = "IMAGE",
}

export interface ColorThemeItem {
    styleType: StyleType.FILl
    color: string
    fillType: FillType
}

export interface EffectThemeItem {
    styleType: StyleType.EFFECT
    // TBD
    boxShadow: string
}

export interface TextThemeItem {
    styleType: StyleType.TEXT
    // TBD
    fontSize: string
}

export type ThemeItem = ColorThemeItem | EffectThemeItem | TextThemeItem
export type ThemeMap = Record<string, ThemeItem>

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
    esm = 'esm',
    commonjs = 'commonjs',
    css = 'css'
}

export enum Commands {
    theme = 'theme',
    components = 'build'
}

export interface Color { 
    r: number
    g: number
    b: number
    a: number
}

export enum FillType {
    GRADIENT_LINEAR = "GRADIENT_LINEAR",
    SOLID = "SOLID"
}

export interface FillLinearGradient {
    type: FillType.GRADIENT_LINEAR
    opacity: number
    gradientStops: Array<{
        color: Color;
        /**
         * From 0 to 1
         */
        position: number;
    }>
}

export interface FillSolid {
    type: FillType.SOLID
    opacity: number
    color: Color
}

export type Fill = FillLinearGradient | FillSolid