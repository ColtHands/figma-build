import { FillType, type ColorThemeItem, type FillNode } from '../types'

export function getColorThemeStyles(node: any): Omit<ColorThemeItem, "styleType"> {
    return { background: parseColorFromNode(node) }
}

export function parseColorFromNode(node: FillNode): Omit<ColorThemeItem, "styleType"> {
    if(!node?.document?.fills?.length) return ""

    const firstFill = node.document.fills[0]

    if(firstFill.type === FillType.SOLID) {
        const color = firstFill.color
        const opacity = firstFill.opacity
        const rgbValues = [color.r, color.g, color.b]
        return `rgba(${[rgbValues.map(parseColorValue), opacity ?? color.a].join(",")})`
    }

    return ""
}

function parseColorValue(value: number): number {
    return Math.round(value * 255)
}