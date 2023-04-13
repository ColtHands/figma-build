import { Color } from "../../types";

export function extractColor(fill: {
    opacity?: number
    color: Color
}): string {
    const color = fill.color
    const opacity = fill.opacity ?? 1
    const rgbValues = [color.r, color.g, color.b]
    return (`rgba(${[...rgbValues.map(parseColorValue), opacity * parseAlphaOpacity(color.a)].join(", ")})`);
}

function parseColorValue(value: number): number {
    return Math.round(value * 255)
}

/**
 * The alpha values could be any decimal point, but human eye can barely notice two decimal points of change.
 * Even though having 0.11999999731779099 is technically correct, for readability value is rounded to two decimal points
 * @see https://stackoverflow.com/questions/19409115/html-rgba-color-opacity
 * @param value - 0.11999999731779099
 * @returns - 0.12
 */
function parseAlphaOpacity(value: number): number {
    return Math.round(value * 100) / 100
}