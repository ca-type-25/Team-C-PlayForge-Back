const Studio = require('../models/studioModel')

const getStudios = async (req, res) => {
    try {
        const studios = await Studio.find()            

        res.send(studios)

    } catch (error) {
        res.status(500).send(error)
    }
}


const getStudioById = async (req, res) => {
    try {
        const { id } = req.params
        const studio = await Studio.findById(id)        
        if (!studio) {
            return res.status(404).send({ error: 'Studio not found' })
        }

        res.send(studio)
        
    } catch (error) {
        res.status(500).send(error)
    }
}


const createStudio = async (req, res) => {
    try {
        const studio = new Studio(req.body)
        await studio.save()
        res.send(studio)

    } catch (error) {
        res.status(500).send(error)
    }
}


const updateStudio = async (req, res) => {
    try {
        const { id } = req.params

        const updatedStudio = await Studio.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        if (!updatedStudio) {
            return res.status(404).send({ error: 'Studio not found' })
        }

        res.send(updatedStudio)

    } catch (error) {
        res.status(500).send(error)
    }
}


const deleteStudio = async (req, res) => {
    try {
        const { id } = req.params
        const deletedStudio = await Studio.findByIdAndDelete(id)

        if (!deletedStudio) {
            return res.status(404).send({ error: 'Studio not found.' })
        }

        res.send({ message: 'Studio record was removed', data: deletedStudio })

    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getStudios,
    getStudioById,
    createStudio,
    updateStudio,
    deleteStudio
}