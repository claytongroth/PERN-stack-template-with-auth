const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator(user_id){

    const payload = {
        user: user_id
    }
    //return our signed JWT 
    return jwt.sign(payload, process.env.SECRET, {expiresIn: "1hr"})
}
module.exports = jwtGenerator;