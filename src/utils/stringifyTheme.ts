import { exitWithMessage } from "./exitWithMessage";

/**
 * Takes in theme and returns stringified JSON while removing unnecessary fields
 * @param theme returned theme from getFigmaThemeStyles
 */
export function stringifyTheme(theme: any): string {
    try {
        return JSON.stringify(theme, styleTypeReplacer, 2);
    } catch(err) {
        exitWithMessage("Unable to parse the theme")
    }

    return ""
}

/**
 * λ replacer function that replaces any field with any value running in JSON.stringify
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#using_a_function_as_replacer
 */
const styleTypeReplacer = (key:string, value:any) => {
    if(key === "styleType") return undefined;
    return value;
} 