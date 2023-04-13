import type { Node } from "../../types";

/**
 * TODO: Parse full text styles
 * @ColtHands
 */
export function getTextThemeItem(node: Node): any {
    if(!node?.document?.style) return {}

    const {
        fontFamily,
        fontWeight,
        fontSize,
        letterSpacing,
        lineHeight
    } = node.document.style

    return {
        fontFamily,
        fontWeight,
        fontSize,
        letterSpacing,
        lineHeight
    }
}