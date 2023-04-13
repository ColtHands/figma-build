import { Color, Fill, FillGradient, FillSolid, FillType, GradientFunctionType } from "../../types";

// TODO: move to contents
const directionMap: Record<GradientFunctionType, string> = {
    "linear-gradient": "180deg",
    "radial-gradient": "50% 50% at 50% 50%",
    "conic-gradient": "from 180deg at 50% 50%"
}

export function parseColorFromNode(node: { document: { fills: Fill[] } }): string {
    // TODO: divide to color and gradient types
    const fills = node?.document?.fills ?? []
    if (fills.length === 1 && fills[0].type === FillType.SOLID) {
        // NOTE: simple color, other things will be parsed as gradient
        return extractColor(fills[0])
    }
    const parsedFills: string[] = []
    for(const fill of fills ?? []) {
        switch (fill.type) {
            case FillType.SOLID:
                parsedFills.push(extractSingleColorGradient(fill))
                break
            case FillType.GRADIENT_LINEAR:
                parsedFills.push(extractGradient(fill, "linear-gradient"))
                break
            case FillType.GRADIENT_RADIAL:
            case FillType.GRADIENT_DIAMOND:
                parsedFills.push(extractGradient(fill, "radial-gradient"))
                break
            case FillType.GRADIENT_ANGULAR:
                parsedFills.push(extractGradient(fill, "conic-gradient"))
                break
        }
    }

    // TODO: only for mixed gradient
    const hasDifferentTypes = fills.some(fill => fills.some(f => f.type !== fill.type))
    if (hasDifferentTypes) {
        // NODE: mixed gradients comes in reversed order, have no idea why
        parsedFills.reverse()
    }
    
    return parsedFills.join(", ")
}

function extractSingleColorGradient(fill: FillSolid): string {
    const color = extractColor(fill);
    return `linear-gradient(${["0deg", color, color].join(", ")})`
}

function extractGradient(fill: FillGradient, gradientFunction: GradientFunctionType): string {
    const measureAs: "%" | "deg" = gradientFunction === "conic-gradient" ? "deg" : "%";
    return `${gradientFunction}(${[directionMap[gradientFunction], ...extractGradientStops(fill, measureAs)].join(", ")})`
}

function extractGradientStops(fill: FillGradient, measureAs: "%" | "deg"): string[] {
    return fill.gradientStops.map(gradientStop => {
        const color = extractColor({...gradientStop, opacity: fill.opacity})
        const stopPointPercentage = Math.round(gradientStop.position * (measureAs === "%" ? 100 : 360))
        return `${color} ${stopPointPercentage}${measureAs}`;
    })
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