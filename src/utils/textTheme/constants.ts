import { TextCaseType, TextDecorationType } from "../../types";

export const textCaseMap: Record<TextCaseType, string> = {
    "UPPER": "uppercase",
    "LOWER": "lowercase",
    "TITLE": "capitalize"
}

export const textDecorationMap: Record<TextDecorationType, string> = {
    "UNDERLINE": "underline",
    "STRIKETHROUGH": "line-through",
}