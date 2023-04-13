import { type EffectThemeItem } from "../../types";

export function getEffectThemeItem(node: any): Omit<EffectThemeItem, "styleType"> {
    // TODO: parse effect styles (box-shadow: default and inner, blur, background-blur)
    return { boxShadow: "" }
}