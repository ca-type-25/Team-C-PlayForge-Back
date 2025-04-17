const Subject = require('../models/subjectModel')

const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find()            

        res.send(subjects)

    } catch (error) {
        res.status(500).send(error)
    }
}


const getSubjectById = async (req, res) => {
    try {
        const { id } = req.params
        const subject = await Subject.findById(id)        
        if (!subject) {
            return res.status(404).send({ error: 'Subject not found' })
        }

        res.send(subject)
        
    } catch (error) {
        res.status(500).send(error)
    }
}


const createSubject = async (req, res) => {
    try {
        const subject = new Subject(req.body)
        await subject.save()
        res.send(subject)

    } catch (error) {
        res.status(500).send(error)
    }
}


const updateSubject = async (req, res) => {
    try {
        const { id } = req.params

        const updatedSubject = await Subject.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        if (!updatedSubject) {
            return res.status(404).send({ error: 'Subject not found' })
        }

        res.send(updatedSubject)

    } catch (error) {
        res.status(500).send(error)
    }
}


const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params
        const deletedSubject = await Subject.findByIdAndDelete(id)

        if (!deletedSubject) {
            return res.status(404).send({ error: 'Subject not found.' })
        }

        res.send({ message: 'Subject record was removed', data: deletedSubject })

    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getSubjects,
    getSubjectById,
    createSubject,
    updateSubject,
    deleteSubject
}