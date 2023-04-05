export function parseColorFromNode(node: { document: { fills: Array<{ opacity: number, color: { r: number, g: number; b: number, a: number } }> } }): string {
    if (node?.document?.fills?.length) {
        const color = node.document.fills[0].color
        const opacity = node.document.fills[0].opacity
        const rgbValues = [color.r, color.g, color.b]
        return `rgba(${[rgbValues.map(parseColorValue), opacity ?? color.a].join(",")})`
    }
    return ""
} 

function parseColorValue(value: number): number {
    return Math.round(value * 255)
}