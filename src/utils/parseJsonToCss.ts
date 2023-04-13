/**
 * Takes javascript object and returns a dangerously parsed string as a valid css
 * @param obj Javascript object
 * @returns string as a valid css
 */
export function toCss(obj: any) {
    let parsedObject = Object.fromEntries(Object.entries(obj).map(([key, value]) => {
        return [key.replace(/\./g, '-'), value]
    }))

    let cssVariables = []

    for(const themeObjectName of Object.keys(parsedObject)) {
        console.log('themeObjectName', themeObjectName)
        console.log('themeObjectValue', parsedObject[themeObjectName])
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
        
        // for(const themeObjectValue of Object.entries(parsedObject[themeObjectName])) {
        //     console.log('themeObjectValue', themeObjectValue)
        // }
    }

    const css = `:root {\n    ${cssVariables.join(';\r    ')}\n}`

    return css
}