const express = require('express')
const { getArticles, getArticleById, createArticle, updateArticle, deleteArticle } = require('../controllers/articleController')

const router = express.Router()

router.get('/', getArticles)
router.get('/:id', getArticleById)
router.post('/', createArticle)
router.put('/:id', updateArticle)
router.delete('/:id', deleteArticle)

module.exports = router