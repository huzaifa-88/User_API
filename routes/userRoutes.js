const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController');

router.post('/users', userControllers.createUser);

router.get('/users', userControllers.getAllUser);

router.put('/users', userControllers.updateUser);

router.delete('/users', userControllers.deleteUser);

router.get('/login', userControllers.loginUser);

module.exports = router;