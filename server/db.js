const Pool = require("pg").Pool;

const pool = new Pool({
    connectionString: "postgresql://doadmin:zurksu06i7liaf1j@chess-postgres-do-user-7583540-0.a.db.ondigitalocean.com:25060/pernstacktemplate?sslmode=require",
    ssl: true
})

module.exports = pool;

    // username: "doadmin",
    // password: "zurksu06i7liaf1j",
    // host: "chess-postgres-do-user-7583540-0.a.db.ondigitalocean.com",
    // port: 25060,
    // database: "pernstacktemplate"