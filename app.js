const express = require('express')
const process = require('process')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()
require('./db')

// eslint-disable-next-line no-unused-vars
const colors = require('colors')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'PlayForge API is running!' })
})

const articlesApiRoutes = require('./api/articlesAPI')
const gamesApiRoutes = require('./api/gamesAPI')
const studiosApiRoutes = require('./api/studiosAPI')
const topicsApiRoutes = require('./api/topicsAPI')
const genresApiRoutes = require('./api/genresAPI')

app.use('/articles', articlesApiRoutes)
app.use('/games', gamesApiRoutes)
app.use('/studios', studiosApiRoutes)
app.use('/topics', topicsApiRoutes)
app.use('/genres', genresApiRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Server is running on port: '.italic.brightMagenta + `${PORT}`.italic.yellow))