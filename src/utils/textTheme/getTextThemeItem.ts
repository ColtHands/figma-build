/**
 * TODO: Parse full text styles
 * @ColtHands
 */
export function getTextThemeItem(node: any): any {
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