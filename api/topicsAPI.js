const express = require('express')
const { getTopics, getTopicById, createTopic, updateTopic, deleteTopic } = require('../controllers/topicController')

const router = express.Router()

router.get('/', getTopics)
router.get('/:id', getTopicById)
router.post('/', createTopic)
router.put('/:id', updateTopic)
router.delete('/:id', deleteTopic)

module.exports = router