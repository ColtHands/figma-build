import {type ColorThemeItem, FillType, Node} from "../../types";
import { getColorThemeItem } from "./getColorThemeItem";
import { getGradientThemeItem } from "./getGradientThemeItem";

export function getFillThemeItem(node: Node): Omit<ColorThemeItem, "styleType"> {
    if (isSingleColor(node)) {
        return getColorThemeItem(node)
    } 
    return getGradientThemeItem(node)
}

const isSingleColor = (node: Node) => {
    const fills = node?.document?.fills ?? []
    return fills.length === 1 && fills[0].type === FillType.SOLID
}