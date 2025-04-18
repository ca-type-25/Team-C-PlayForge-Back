const express = require('express')
const { getSubjects, getSubjectById, createSubject, updateSubject, deleteSubject } = require('../controllers/subjectController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', getSubjects)
router.get('/:id', getSubjectById)
router.post('/', authMiddleware, createSubject)
router.put('/:id', authMiddleware, updateSubject)
router.delete('/:id', authMiddleware, deleteSubject)

module.exports = router