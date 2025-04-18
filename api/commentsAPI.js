const express = require('express')
const { getComments, getCommentById, createComment, updateComment, deleteComment } = require('../controllers/commentController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', authMiddleware, getComments)
router.get('/:id', authMiddleware, getCommentById)
router.post('/', authMiddleware, createComment)
router.put('/:id', authMiddleware, updateComment)
router.delete('/:id', authMiddleware, deleteComment)

module.exports = router