const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage
module.exports = function(req, res, next) {
  try {
      // Get token from header
    const jwtToken = req.header("token");
    // Check if not token
    if (!jwtToken) {
        return res.status(403).json({ msg: "authorization denied" });
    }
    // Verify token
    //it is going to give use the user id (user:{id: user.id}) 
    //* UUID is stored in the token of the Payload!
    const payload = jwt.verify(jwtToken, process.env.SECRET);
    console.log({payload})
    // add the *user* payload tot he request body so that the other middlware fucntions get it.
    req.user = payload.user;
    //go to next middleware
    next();

  } catch (err) {
    console.error(err)
    res.status(401).json({ msg: "Token is not valid" });
  }
};