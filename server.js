const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const env = require('dotenv').config();
var Model = require("./src/models");

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 5000;

//to sync the migration
Model.sequelize.sync(); 

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Require user routes
const userRoutes = require('./src/routes/users.routes')
const authenticationRoutes = require("./src/routes/auth.routes")
const freelancerRoutes = require("./src/routes/freelancer.routes")
const hireRoutes = require("./src/routes/hires.routes") 
const rateRoutes = require("./src/routes/rates.routes") 

// using as middleware
app.use('/api/v1/users', userRoutes)
app.use('/api/auth', authenticationRoutes)
app.use('/api/v1/freelancers', freelancerRoutes)
app.use('/api/v1/hires', hireRoutes)
app.use('/api/v1/rates', rateRoutes)

// define a root route
app.get('/', (req, res) => {
  res.send();
});

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

//set public folder as static folder for static file
app.use('/assets',express.static(__dirname + '/public'));

