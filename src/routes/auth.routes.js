const express = require('express')
const router = express.Router()
const authController = require("../controllers/authentication");

//route for api login
router.post("/login", authController.login);

module.exports = router;  