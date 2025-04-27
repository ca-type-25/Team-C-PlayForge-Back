const express = require('express')
const { getReviews, getReviewById, createReview, updateReview, deleteReview, getReviewsByGameId } = require('../controllers/reviewController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', getReviews)
router.get('/:id', getReviewById)
router.post('/', authMiddleware, createReview)
router.put('/:id', authMiddleware, updateReview)
router.delete('/:id', authMiddleware, deleteReview)
router.get('/game/:gameId', authMiddleware, getReviewsByGameId)

module.exports = router