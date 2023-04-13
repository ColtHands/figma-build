import { type ColorThemeItem } from "../../types";
import { parseColorFromNode } from "./parseColor";

export function getColorThemeItem(node: any): Omit<ColorThemeItem, "styleType"> {
    return { color: parseColorFromNode(node) }
}