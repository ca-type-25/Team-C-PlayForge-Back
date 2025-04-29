const express = require('express');
const { getStudios, getStudioById, createStudio, updateStudio, deleteStudio } = require('../controllers/studioController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/rolesMiddleware');

const router = express.Router();

router.get('/', getStudios);
router.get('/:id', getStudioById);

router.post('/', authMiddleware, roleMiddleware('ADMIN', 'MODERATOR'), createStudio);
router.put('/:id', authMiddleware, roleMiddleware('ADMIN', 'MODERATOR'), updateStudio);
router.delete('/:id', authMiddleware, roleMiddleware('ADMIN', 'MODERATOR'), deleteStudio);

module.exports = router;
