import type { TextThemeItem, } from '../types'

export function getTextThemeStyles(node: any): Omit<TextThemeItem, "styleType"> {
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