const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization')
//registering routes

router.post("/register", validInfo, async (req, res) => {
    try {
        //* destructure name, email, pw from req body
        const { name, email, password } = req.body;
        //* exists ? throw error
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ])

        //* chekc if that user already exists...
        if (user.rows.length !== 0){
            return res.status(401).json("User already exists.")
        }
        //* bcyrpt password... to insert into DB
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        //* enter the user into DB
        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
        )
        
        //* generate JWT
        const token = jwtGenerator(newUser.rows[0].user_id)

        res.json({ token })
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

//login route
router.post("/login", validInfo, async(req,res) =>{
    try {
        //* destructure body
        const { email, password } = req.body;

        //* check if user does NOT exist, throw error
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[
            email
        ])

        if (user.rows.length === 0 ){
            return res.status(401).json("Password or Email is incorrect.")
        }

        //* check if incoming pasword is same as DB password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validPassword){
            return res.status(401).json("Password or Email is incorrect.")
        }

        //* give JWT token
        const token = jwtGenerator(user.rows[0].user_id)

        res.json({ token })
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

router.get("/verified", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        res.status(500).send("Server Error");
    }
})


module.exports = router;