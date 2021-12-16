const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
// Import routes
const routes = require('./routes/index')();

app.use(express.json({ limit: "30mb", extended: true }));

// MongoDB 
//const mongoURL = "mongodb+srv://lum:lum@cluster0.xgpts.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongoURL = "mongodb+srv://cstu:cstu@cluster0.wrqrh.mongodb.net/us_army_db?retryWrites=true&w=majority";
const http = require('http');

// Connect to MongoDB
mongoose.connect(mongoURL, (err, db) => {
    console.log("Connected ... DB:::: ")
    if (err) console.log('mongodb Error: ' + err);
});

app.use(express.static(path.join(__dirname, '../client/build')));

// Parse  middleware  
app.use(bodyParser.json());

const server = http.createServer(app);

app.use('/', routes);

server.listen(port);