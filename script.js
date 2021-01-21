const express = require('express');
const bodyparser = require('body-parser');
const port = process.env.PORT || 3306;

var app = express();

//Configuring express server
app.use(bodyparser.json());

app.listen(port, () => console.log(`Listening on port ${port}..`));