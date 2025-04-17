const express = require('express')
const { getGenres, getGenreById, createGenre, updateGenre, deleteGenre } = require('../controllers/genreController')

const router = express.Router()

router.get('/', getGenres)
router.get('/:id', getGenreById)
router.post('/', createGenre)
router.put('/:id', updateGenre)
router.delete('/:id', deleteGenre)

module.exports = router