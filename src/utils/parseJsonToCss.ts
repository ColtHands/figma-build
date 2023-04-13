import { stringifyTheme } from './stringifyTheme'

/**
 * Takes javascript object and returns a dangerously parsed string as a valid css
 * @param obj Javascript object
 * @returns string as a valid css
 */
export function toCssVariables(obj: any) {
    let parsedObject = Object.fromEntries(Object.entries(obj).map(([key, value]) => {
        return [key.replace(/\./g, '-'), value]
    }))

    let cssVariables = []

    for(const themeObjectName of Object.keys(parsedObject)) {
        const themeObjectValue = parsedObject[themeObjectName];

        // @ts-ignore
        for(const themeStyleKey of Object.keys(themeObjectValue)) {
            if(themeStyleKey === 'styleType') continue;
            // @ts-ignore
            if(!themeObjectValue[themeStyleKey]) continue;

            // @ts-ignore
            let variable = `--${themeObjectName}-${themeStyleKey}: ${themeObjectValue[themeStyleKey]}`
            cssVariables.push(variable)
        }
    }

    const css = `:root {\n    ${cssVariables.join(';\r    ')}\n}`

    return css
}

export function toCssClassNames(obj: any) {
    let parsedObject = Object.fromEntries(Object.entries(obj).map(([key, value]) => {
        return [`.${key.replace(/\./g, '-')}`, value]
    }))

    let css = "";

    for(const themeKey of Object.keys(parsedObject)) {
        const themeObject = parsedObject[themeKey]
        const themeObjectStyles: any[] = []

        // @ts-ignore
        for(const themeStyleKey of Object.keys(themeObject)) {
            // @ts-ignore
            if(themeObject[themeStyleKey] == undefined) continue;
            if(themeStyleKey === 'styleType') continue;
            
            // @ts-ignore
            const styleValue = themeObject[themeStyleKey];
            const styleKey = themeStyleKey.split(/(?=[A-Z])/).join('-').toLowerCase();

            themeObjectStyles.push(`${styleKey}: ${styleValue}`)
        }

        css += `${themeKey} {\r    ${themeObjectStyles.join(';\r    ')};\r}\r\r`
    }

    return css;
}

/** TODO Add regexp to parse css styles @ColtHands */