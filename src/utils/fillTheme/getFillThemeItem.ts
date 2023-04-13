import { type ColorThemeItem } from "../../types";
import { parseColorFromNode } from "./parseColor";

export function getFillThemeItem(node: any): Omit<ColorThemeItem, "styleType"> {
    // TODO: devide to color and gradient type on this level
    return { color: parseColorFromNode(node) }
}