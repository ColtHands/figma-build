import type { BlurEffect } from "../../types";

export function extractFilter(effect: BlurEffect): string {
    return `blur(${effect.radius}px)`
}