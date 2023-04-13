import { type ColorThemeItem, type EffectThemeItem, StyleType, type ThemeMap, type TextThemeItem } from "./types";

function getColorThemeItem(node: any): Omit<ColorThemeItem, "styleType"> {
    return { color: parseColorFromNode(node) }
}