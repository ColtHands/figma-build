import { type ColorThemeItem, type EffectThemeItem, StyleType, type ThemeMap, type TextThemeItem } from "./types";

function getEffectThemeItem(node: any): Omit<EffectThemeItem, "styleType"> {
    // TODO: parse effect styles
    return { boxShadow: "" }
}