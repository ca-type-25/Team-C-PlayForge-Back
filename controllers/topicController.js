const Topic = require('../models/topicModel')

const getTopics = async (req, res) => {
    try {
        const topics = await Topic.find()            

        res.send(topics)

    } catch (error) {
        res.status(500).send(error)
    }
}


const getTopicById = async (req, res) => {
    try {
        const { id } = req.params
        const topic = await Topic.findById(id)        
        if (!topic) {
            return res.status(404).send({ error: 'Topic not found' })
        }

        res.send(topic)
        
    } catch (error) {
        res.status(500).send(error)
    }
}


const createTopic = async (req, res) => {
    try {
        const topic = new Topic(req.body)
        await topic.save()
        res.send(topic)

    } catch (error) {
        res.status(500).send(error)
    }
}


const updateTopic = async (req, res) => {
    try {
        const { id } = req.params

        const updatedTopic = await Topic.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        if (!updatedTopic) {
            return res.status(404).send({ error: 'Topic not found' })
        }

        res.send(updatedTopic)

    } catch (error) {
        res.status(500).send(error)
    }
}


const deleteTopic = async (req, res) => {
    try {
        const { id } = req.params
        const deletedTopic = await Topic.findByIdAndDelete(id)

        if (!deletedTopic) {
            return res.status(404).send({ error: 'Topic not found.' })
        }

        res.send({ message: 'Topic record was removed', data: deletedTopic })

    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getTopics,
    getTopicById,
    createTopic,
    updateTopic,
    deleteTopic
}