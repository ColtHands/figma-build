import { type ColorThemeItem, Fill, FillType } from "../../types";
import { getColorThemeItem } from "./getColorThemeItem";
import { getGradientThemeItem } from "./getGradientThemeItem";

export function getFillThemeItem(node: { document: { fills: Fill[] } }): Omit<ColorThemeItem, "styleType"> {
    if (isSingleColor(node)) {
        return getColorThemeItem(node)
    } 
    return getGradientThemeItem(node)
}

const isSingleColor = (node: { document: { fills: Fill[] } }) => {
    const fills = node?.document?.fills ?? []
    return fills.length === 1 && fills[0].type === FillType.SOLID
}