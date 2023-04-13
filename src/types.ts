export type FigmaRestMethods = 'file' | 'files' | 'images'

export enum StyleType {
    FILL = "FILL",
    EFFECT = "EFFECT",
    TEXT = "TEXT",
}

enum NodeType {
    RECTANGLE = "RECTANGLE",
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
    styleType?: StyleType.FILL
    color: string
    fillType?: FillType
}

export interface EffectThemeItem {
    styleType?: StyleType.EFFECT
    // TBD
    boxShadow: string
}

export interface TextThemeItem {
    styleType?: StyleType.TEXT
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
    fileId: string,
    outputPath: string,
    filename: string,
    outputFormat: OutputFormat,
}

export enum OutputFormat {
    json = 'json',
    esm = 'esm',
    commonjs = 'commonjs',
    css = 'css',
    "css-variables" = 'css-variables',
    sass = 'sass',
    scss = 'scss',
    "post-css" = 'post-css',
    stdout = 'stdout'
}

export enum Commands {
    theme = 'theme',
    components = 'build',
    images = 'images'
}

export interface FillNode {
    document: {
        id: string,
        name: string,
        fills: Array<{
            opacity: number,
            color: {
                r: number,
                g: number,
                b: number,
                a: number
            }
        }>,
        strokes: Array<any>,
    },
    components: Record<string, never>,
    componentSets: Record<string, never>,
    schemaVersion: 0,
    styles: Record<string, never>
}

export interface Color { 
    r: number
    g: number
    b: number
    a: number
}

export interface FillGradient {
    type: FillType.GRADIENT_LINEAR | FillType.GRADIENT_RADIAL | FillType.GRADIENT_ANGULAR | FillType.GRADIENT_DIAMOND
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

export type Fill = FillGradient | FillSolid

export type GradientFunctionType = "linear-gradient" | "radial-gradient" |"conic-gradient"
export interface Node {
    document: {
        id: string,
        name: string,
        fills: Array<Fill>,
        strokes: Array<any>,
        style?: Record<string, never> & {
            fontFamily: string,
            fontPostScriptName: string,
            fontWeight: number,
            textAutoResize: "WIDTH_AND_HEIGHT", // TODO: update with possible values
            fontSize: number,
            textAlignHorizontal: "LEFT", // TODO: update with possible values
            textAlignVertical: "TOP", // TODO: update with possible values
            letterSpacing: number,
            lineHeightPx: number,
            lineHeightPercent: number,
            lineHeightUnit: "INTRINSIC_%" // TODO: update with possible values
        }
    },
    components: Record<string, never>,
    componentSets: Record<string, never>,
    schemaVersion: 0,
    styles: Record<string, never>
}