const express = require('express')
const { getTopics, getTopicById, createTopic, updateTopic, deleteTopic } = require('../controllers/topicController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', authMiddleware, getTopics)
router.get('/:id', authMiddleware, getTopicById)
router.post('/', authMiddleware, createTopic)
router.put('/:id', authMiddleware, updateTopic)
router.delete('/:id', authMiddleware, deleteTopic)

module.exports = router