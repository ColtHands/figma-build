import { ColorThemeItem, Fill, FillSolid } from "../../types";
import { extractColor } from "./extractColor";

export function getColorThemeItem(node: { document: { fills: Fill[] } }): Omit<ColorThemeItem, "styleType"> {
    const fills = node?.document?.fills ?? []
    const firstFill = fills[0] as FillSolid;
    return { color: extractColor(firstFill) }
}