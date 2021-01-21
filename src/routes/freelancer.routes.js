const express = require('express')
const router = express.Router()
const freelancerController = require('../controllers/freelancers');

// Retrieve all users
router.get('/', freelancerController.getAllFreelancer);

// Create a new users
router.post('/', freelancerController.createFreelancer);

// Retrieve a single user with id
router.get('/:id', freelancerController.getFreelancer);

// Delete a user with id
router.delete('/:id', freelancerController.deleteFreelancer);

module.exports = router;