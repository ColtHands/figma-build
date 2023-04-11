import {Color, Fill, FillLinearGradient, FillSolid, FillType} from "../types";

export function parseColorFromNode(node: { document: { fills: Fill[] } }): string {
    const parsedFills: string[] = [];
    
    for(const fill of node?.document?.fills ?? []) {
        switch (fill.type) {
            case FillType.SOLID:
                parsedFills.push(extractColor(fill))
                break
            case FillType.GRADIENT_LINEAR:
                parsedFills.push(extractLinearGradient(fill))
                break
        }
    }
    
    return parsedFills.join(", ")
}

function extractLinearGradient(fill: FillLinearGradient): string {
    const gradientStops = fill.gradientStops.map(gradientStop => {
        const color = extractColor({...gradientStop, opacity: fill.opacity})
        const stopPointPercentage = Math.round(gradientStop.position * 100)
        return `${color} ${stopPointPercentage}%`;
    })
    
    return `linear-gradient(${["180deg", ...gradientStops].join(", ")})`
}

function extractColor(fill: {
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