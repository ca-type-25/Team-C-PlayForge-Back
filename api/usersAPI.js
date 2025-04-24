const express = require('express')
const { register, login, updateUser, getUsers, getUserById, deleteUser, changeUserRole } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.put('/:id', authMiddleware, updateUser)

router.get('/', authMiddleware, getUsers)
router.get('/:id', authMiddleware, getUserById)
router.delete('/:id', authMiddleware, deleteUser)
router.patch('/:id/role', authMiddleware, changeUserRole)

module.exports = router