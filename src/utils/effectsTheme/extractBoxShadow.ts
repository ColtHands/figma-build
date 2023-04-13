import type { ShadowEffect } from "../../types";
import { extractColor } from "../fillTheme/extractColor";

export function extractBoxShadow(effect: ShadowEffect): string {
    return `${effect.offset.x}px ${effect.offset.y}px ${effect.radius}px ${effect.spread ?? 0}px ${extractColor(effect)}`
}

export function extractInnerBoxShadow(effect: ShadowEffect): string {
    return `inset ${extractBoxShadow(effect)}`
}