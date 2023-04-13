import { Color } from "../../types";

export function extractColor(fill: {
    opacity?: number
    color: Color
}): string {
    const color = fill.color
    const opacity = fill.opacity ?? 1
    const rgbValues = [color.r, color.g, color.b]
    return (`rgba(${[...rgbValues.map(parseColorValue), opacity * color.a].join(", ")})`);
}

function parseColorValue(value: number): number {
    return Math.round(value * 255)
}