const express = require("express");
const app = express()
const cors = require("cors");
const jwtAuth = require("./routes/jwtAuth")
const dashboard = require("./routes/dashboard")
require('dotenv').config();

const PORT = process.env.PORT || 5000;

//middlewware
app.use(express.json()); //req.bosy access 
app.use(cors());

//routes

//authentication Route
//* anything that passes through /auth will get this middleware.
app.use('/auth', jwtAuth);

//Dashboard Route
app.use('/dashboard', dashboard);



app.listen(PORT, () => {
    console.log("Server is running on PORT", PORT)
})