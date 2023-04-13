import { ColorThemeItem, FillSolid, Node } from "../../types";
import { extractColor } from "./extractColor";

export function getColorThemeItem(node: Node): Omit<ColorThemeItem, "styleType"> {
    const fills = node?.document?.fills ?? []
    const firstFill = fills[0] as FillSolid;
    return { color: extractColor(firstFill) }
}