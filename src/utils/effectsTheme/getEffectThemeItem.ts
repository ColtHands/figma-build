import { type EffectThemeItem, type Node, EffectType } from "../../types";
import { extractBoxShadow, extractInnerBoxShadow } from "./extractBoxShadow";
import { extractFilter } from "./extractFilter";
import { removeEmptyFields } from "../helpers";

export function getEffectThemeItem(node: Node): Omit<EffectThemeItem, "styleType"> {
    const effects = node.document.effects ?? []
    const parsedBoxShadow: string[] = []
    const parsedEffects: { filter?: string, backdropFilter?: string } = {};
    for (let effect of effects) {
        switch (effect.type) {
            case EffectType.DROP_SHADOW:
                parsedBoxShadow.push(extractBoxShadow(effect))
                break
            case EffectType.INNER_SHADOW:
                parsedBoxShadow.push(extractInnerBoxShadow(effect))
                break
            case EffectType.LAYER_BLUR:
                if(parsedEffects.filter) {
                    console.warn("Warning: There is more than one filter layer! Only first will be applied.")
                    break;
                }
                parsedEffects.filter = extractFilter(effect);
                break
            case EffectType.BACKGROUND_BLUR:
                if(parsedEffects.backdropFilter) {
                    console.warn("Warning: There is more than one backdrop-filter layer! Only first will be applied.")
                    break;
                }
                parsedEffects.backdropFilter = extractFilter(effect)
                break
        }
    }
    return removeEmptyFields({ ...parsedEffects, boxShadow: parsedBoxShadow.length ? parsedBoxShadow.join(", ") : undefined })
}