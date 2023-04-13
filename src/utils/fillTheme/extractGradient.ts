import { FillGradient, FillSolid, GradientFunctionType } from "../../types";
import { extractColor } from "./extractColor";
import { directionMap } from "./constants";

export function extractSingleColorGradient(fill: FillSolid): string {
    const color = extractColor(fill);
    return `linear-gradient(${["0deg", color, color].join(", ")})`
}

export function extractGradient(fill: FillGradient, gradientFunction: GradientFunctionType): string {
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