import { type ColorThemeItem, type EffectThemeItem, StyleType, type ThemeMap, type TextThemeItem } from "./types";

export function getTextThemeItem(node: any): Omit<TextThemeItem, "styleType"> {
    // TODO: parse text styles
    return { fontSize: "" }
}
