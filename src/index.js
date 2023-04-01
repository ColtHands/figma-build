require('dotenv').config()

const { fetchFigmaStyleKeys } = require('./scripts/fetchFigmaStyleKeys')

const styleKeys = fetchFigmaStyleKeys()