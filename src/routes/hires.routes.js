const express = require('express')
const router = express.Router()
const hireController = require('../controllers/hires');

// Retrieve all users
router.get('/', hireController.getAllHires);

// Create a new users
router.post('/', hireController.createHires); 

// Retrieve a single user with id
router.get('/:id', hireController.getHires);

// Delete a user with id
router.delete('/:id', hireController.deleteHires);

module.exports = router;