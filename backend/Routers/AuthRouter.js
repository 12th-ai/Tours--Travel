const express = require('express');
const router = express.Router();
const userController = require('../Controllers/Authcontroller');

const auth = require('../Middleware/Auth');

// Public routes
router.post('/login', userController.login);

// Protected routes

router.get('/me', auth, userController.getLoggedInUser);       
router.post('/', userController.createUser);
router.get('/', auth, userController.getUsers);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;
