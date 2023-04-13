import type { EffectThemeItem, Node } from "../../types";

export function getEffectThemeItem(node: Node): Omit<EffectThemeItem, "styleType"> {
    // TODO: parse effect styles (box-shadow: default and inner, blur, background-blur)
    return { boxShadow: "" }
}