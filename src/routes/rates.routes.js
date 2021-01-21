const express = require('express')
const router = express.Router()
const rateController = require('../controllers/rates');

// Retrieve all rating of a freelancer
router.get('/', rateController.getAllRates);

// Give a rating to a freelancer
router.post('/', rateController.createRates); 

// Retrieve a single rating with id
router.get('/:id', rateController.getRates);

// Delete a rating with id
router.delete('/:id', rateController.deleteRates);

module.exports = router;