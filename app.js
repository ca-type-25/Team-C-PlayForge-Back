// TOP constant(copy/paste) utilities---------------
const express = require('express')
require('dotenv').config()
const process = require('process')
const bodyParser = require('body-parser')
const cors = require('cors')

require('./db')

// eslint-disable-next-line no-unused-vars
const colors = require('colors')  //reikalingas importas kad spalvas turet terminale


const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Server is running on port: '.italic.brightMagenta + `${PORT}`.italic.yellow))