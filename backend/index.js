const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConnect = require("../backend/config/Database")
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
app.use(bodyParser.json());
// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from React frontend
    credentials: true, // Allow cookies
}));
app.use(express.json());

// Database Connection



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//connect with database 
dbConnect();


//importing the router file to link 


const route = require("../backend/routes/route");


app.use("/api/v1",route);


app.get('/test', (req, res) => {
    console.log(req.cookies); // { token: 'your-token-value' }
    res.send(req.cookies);
});