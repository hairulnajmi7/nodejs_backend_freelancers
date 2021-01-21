const express = require('express')
const router = express.Router()
const userController =   require('../controllers/users');

// Retrieve all users
router.get('/', userController.getAllUser);

// Create a new users
router.post('/', userController.createUser); 

// Retrieve a single user with id
router.get('/:id', userController.getUser);

// Update a user with id
router.put('/:id', userController.updateUser);

// Delete a user with id
router.delete('/:id', userController.deleteUser);

module.exports = router;