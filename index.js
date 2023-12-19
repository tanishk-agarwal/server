// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

// routes
const enrollmentRoutes = require('./src/routes/enrollmentRoutes');

// set up mongo
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,  
    } 
);

app.use(bodyParser.json());
app.use(cors());

app.use('/api', enrollmentRoutes);

app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`);
});
