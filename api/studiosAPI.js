const express = require('express')
const { getStudios, getStudioById, createStudio, updateStudio, deleteStudio } = require('../controllers/studioController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', getStudios)
router.get('/:id', getStudioById)
router.post('/', authMiddleware, createStudio)
router.put('/:id', authMiddleware, updateStudio)
router.delete('/:id', authMiddleware, deleteStudio)

module.exports = router