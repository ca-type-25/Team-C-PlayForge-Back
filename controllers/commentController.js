const Comment = require('../models/commentModel')

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate('topic', 'title').populate('user', 'name')           

        res.send(comments)

    } catch (error) {
        res.status(500).send(error)
    }
}


const getCommentById = async (req, res) => {
    try {
        const { id } = req.params
        const comments = await Comment.findById(id).populate('topic', 'title').populate('user', 'name')        
        if (!comments) {
            return res.status(404).send({ error: 'Comment not found' })
        }

        res.send(comments)
        
    } catch (error) {
        res.status(500).send(error)
    }
}


const createComment = async (req, res) => {
    try {
        const comments = new Comment(req.body)
        await comments.save()
        res.send(comments)

    } catch (error) {
        res.status(500).send(error)
    }
}


const updateComment = async (req, res) => {
    try {
        const { id } = req.params

        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        if (!updatedComment) {
            return res.status(404).send({ error: 'Comment not found' })
        }

        res.send(updatedComment)

    } catch (error) {
        res.status(500).send(error)
    }
}


const deleteComment = async (req, res) => {
    try {
        const { id } = req.params
        const deletedComment = await Comment.findByIdAndDelete(id)

        if (!deletedComment) {
            return res.status(404).send({ error: 'Comment not found.' })
        }

        res.send({ message: 'Comment record was removed', data: deletedComment })

    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
}