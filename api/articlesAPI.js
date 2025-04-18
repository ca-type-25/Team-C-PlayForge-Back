const express = require('express')
const { getArticles, getArticleById, createArticle, updateArticle, deleteArticle } = require('../controllers/articleController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', getArticles)
router.get('/:id', getArticleById)
router.post('/', authMiddleware, createArticle)
router.put('/:id', authMiddleware, updateArticle)
router.delete('/:id', authMiddleware, deleteArticle)

module.exports = router