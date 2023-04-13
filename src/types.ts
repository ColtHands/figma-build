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
    boxShadow?: string
    filter?: string
    backdropFilter?: string
}

export interface TextThemeItem {
    styleType?: StyleType.TEXT
    fontFamily: string
    fontWeight: number
    /*  for CSS, should be converted to px */
    fontSize: number
    /*  for CSS, should be converted to px */
    letterSpacing: number
    /*  for CSS, number values should be converted to px */
    lineHeight: number | string
    /* draft CSS property

    Read more: https://drafts.csswg.org/css-inline-3/#leading-trim
    */
    leadingTrim?: "both"
    /* draft CSS property

    Read more: https://drafts.csswg.org/css-inline-3/#leading-trim
    */
    textEdge?: "cap"
    textTransform?: "uppercase" | "lowercase" | "capitalize"
    textDecoration?: "underline" | "line-through"
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
export type TextCaseType = "UPPER" | "LOWER" | "TITLE"
export type TextDecorationType = "UNDERLINE" | "STRIKETHROUGH"
export type LineHeightUnitType = "FONT_SIZE_%" | "INTRINSIC_%"
export interface Node {
    document: {
        id: string,
        name: string,
        fills: Array<Fill>,
        strokes: Array<any>,
        style?: {
            fontFamily: string,
            fontPostScriptName: string,
            fontWeight: number,
            textAutoResize: string,
            fontSize: number,
            textAlignHorizontal: string, // NOTE: this value comes with styles, but it is not saved as theme
            textAlignVertical: string, // NOTE: this value comes with styles, but it is not saved as theme
            letterSpacing: number,
            lineHeightPx?: number,
            lineHeightPercentFontSize?: number,
            lineHeightUnit: LineHeightUnitType,
            leadingTrim?: "CAP_HEIGHT",
            textDecoration?: TextDecorationType,
            paragraphSpacing?: number,
            listSpacing?: number,
            textCase?: TextCaseType
        },
        effects: Effect[]
    },
    components: Record<string, never>,
    componentSets: Record<string, never>,
    schemaVersion: 0,
    styles: Record<string, never>
}

export enum EffectType {
    DROP_SHADOW = "DROP_SHADOW",
    INNER_SHADOW = "INNER_SHADOW",
    LAYER_BLUR = "LAYER_BLUR",
    BACKGROUND_BLUR = "BACKGROUND_BLUR"
}

export interface ShadowEffect {
    visible: boolean,
    color: Color,
    offset: {
        x: number,
        y: number,
    },
    radius: number,
    showShadowBehindNode: boolean,
    spread?: number,
}

export interface DropShadowEffect extends ShadowEffect {
    type: EffectType.DROP_SHADOW
}

export interface InnerShadowEffect extends ShadowEffect {
    type: EffectType.INNER_SHADOW
}

export interface BlurEffect {
    visible: boolean
    radius: number
}

export interface LayerBlurEffect extends BlurEffect {
    type: EffectType.LAYER_BLUR
}

export interface BackgroundBlurEffect extends BlurEffect {
    type: EffectType.BACKGROUND_BLUR
}

export type Effect = DropShadowEffect | InnerShadowEffect | LayerBlurEffect | BackgroundBlurEffect;