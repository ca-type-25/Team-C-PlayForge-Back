const express = require('express');
const { 
  register, 
  login, 
  updateUser, 
  getUsers, 
  getUserById, 
  deleteUser, 
  changeUserRole 
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/rolesMiddleware');
const canEditUser = require('../middlewares/canEditUser');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', authMiddleware, getUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, canEditUser, updateUser);

router.delete('/:id', authMiddleware, roleMiddleware('ADMIN'), deleteUser);
router.patch('/:id/role', authMiddleware, roleMiddleware('ADMIN'), changeUserRole);


module.exports = router;
