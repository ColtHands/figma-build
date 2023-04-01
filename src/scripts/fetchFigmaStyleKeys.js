const axios = require('axios')
const {
    themePrimary,
    themeDanger,
} = require('./../themeNames.js')

async function fetchFigmaStyleKeys() {
    const figmaStyleKeys = await axios({
        method: 'get',
        url: "https://api.figma.com/v1/files/P2oVdik0Q0pUoIxRIzaMjK/styles",
        headers: {
            "X-Figma-Token": process.env.FIGMA_TOKEN
        }
    })
    const styles = figmaStyleKeys.data.meta.styles
    const styleKeys = styles.map(style => style.key)
    return styleKeys
}

function findComponentByName(name, components) {
    return components.find(component => component.name === name)
}

module.exports.fetchFigmaStyleKeys = fetchFigmaStyleKeys