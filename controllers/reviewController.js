const Review = require('../models/reviewModel')

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('game', 'title').populate('user', 'name avatar')//.populate('user', 'name')            

        res.send(reviews)

    } catch (error) {
        res.status(500).send(error)
    }
}


const getReviewById = async (req, res) => {
    try {
        const { id } = req.params
        const review = await Review.findById(id).populate('game', 'title').populate('user', 'name avatar')//.populate('user', 'name')        
        if (!review) {
            return res.status(404).send({ error: 'Review not found' })
        }

        res.send(review)
        
    } catch (error) {
        res.status(500).send(error)
    }
}


const createReview = async (req, res) => {
    try {
        const { user, game, rating, feedback } = req.body;

        const existingUser = await user.findById(user);
        if (!existingUser) {
            return res.status(400).send({ error: 'Invalid user ID' });
        }

        const existingGame = await game.findById(game);
        if (!existingGame) {
            return res.status(400).send({ error: 'Invalid game ID' });
        }

        const review = new Review({ user, game, rating, feedback });
        await review.save();
        res.send(review);
    } catch (error) {
        res.status(500).send(error);
    }
};


const updateReview = async (req, res) => {
    try {
        const { id } = req.params

        const updatedReview = await Review.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        if (!updatedReview) {
            return res.status(404).send({ error: 'Review not found' })
        }

        res.send(updatedReview)

    } catch (error) {
        res.status(500).send(error)
    }
}


const deleteReview = async (req, res) => {
    try {
        const { id } = req.params
        const deletedReview = await Review.findByIdAndDelete(id)

        if (!deletedReview) {
            return res.status(404).send({ error: 'Review not found.' })
        }

        res.send({ message: 'Review record was removed', data: deletedReview })

    } catch (error) {
        res.status(500).send(error)
    }
}

const getReviewsByGameId = async (req, res) => {
    try {
        const { gameId } = req.params
        const reviews = await Review.find({ game: gameId }).populate('game', 'title').populate('user', 'name avatar')//.populate('user', 'name')        
        if (!reviews) {
            return res.status(404).send({ error: 'Reviews not found' })
        }

        res.send(reviews)
        
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
    getReviewsByGameId
}