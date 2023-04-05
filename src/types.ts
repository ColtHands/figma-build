export type FigmaRestMethods = 'file' | 'files' | 'images'

export enum StyleType {
    FILL = "FILL",
    EFFECT = "EFFECT",
    TEXT = "TEXT",
}

export interface ColorThemeItem {
    styleType: StyleType.FILL
    color: string
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
