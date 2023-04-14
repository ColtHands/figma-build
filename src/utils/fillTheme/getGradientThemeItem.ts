import { ColorThemeItem, FillType, Node } from "../../types";
import { extractGradient, extractSingleColorGradient } from "./extractGradient";

export function getGradientThemeItem(node: Node): Omit<ColorThemeItem, "styleType"> {
    const fills = node?.document?.fills ?? []
    const parsedFills: string[] = []
    for (const fill of fills ?? []) {
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

    const hasDifferentTypes = fills.some(fill => fills.some(f => f.type !== fill.type))
    if (hasDifferentTypes) {
        // NODE: mixed gradients comes in reversed order, have no idea why
        parsedFills.reverse()
    }

    return { background: parsedFills.join(", ") }
}