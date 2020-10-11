const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');


// create express app
const app = express();

app.use(cors()) 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

require('./app/routes/note.routes.js')(app);
require('./app/routes/companies.routes.js')(app);
require('./app/routes/products.routes.js')(app);

// listen for requests
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});

// // Create a Server
// var server = app.listen(3001, function () {

//     var host = server.address().address
//     var port = server.address().port
  
//     console.log("App listening at http://%s:%s", host, port)
//   })