import type { Node, TextThemeItem } from "../../types";
import { removeEmptyFields } from "../helpers";
import { textCaseMap, textDecorationMap } from "./constants";

export function getTextThemeItem(node: Node): Omit<TextThemeItem, "styleType"> | {} {
    if(!node?.document?.style) return {}

    const {
        fontFamily,
        fontWeight,
        fontSize,
        letterSpacing,
        leadingTrim,
        textCase,
        textDecoration,
    } = node.document.style

    return removeEmptyFields({
        fontFamily,
        fontWeight,
        fontSize,
        letterSpacing,
        lineHeight: getLineHeight(node.document.style),
        leadingTrim: leadingTrim === "CAP_HEIGHT" ? "both" : null, // Experimental fields, remove??
        textEdge: leadingTrim === "CAP_HEIGHT" ? "cap" : null, // Experimental fields, remove??
        textTransform: textCase && textCaseMap[textCase],
        textDecoration: textDecoration && textDecorationMap[textDecoration]
    })
}

export const getLineHeight = (style: Node["document"]["style"]) => {
    switch (style?.lineHeightUnit) {
        case "FONT_SIZE_%":
            return style.lineHeightPercentFontSize as number / 100 + "em";
        case "INTRINSIC_%":
            return Math.round(style.lineHeightPx as number);
    }
}