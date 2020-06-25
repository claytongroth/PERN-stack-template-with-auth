const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

//get with authorization middleware

router.get("/", authorization, async (req, res) => {
    try {
        // payload will be set to users UUID from AUTH middleware
        const user = await pool.query(
            "SELECT user_name FROM users WHERE user_id = $1", 
            [req.user]
        )

        res.json(user.rows[0])
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error")
    }
})

module.exports = router;