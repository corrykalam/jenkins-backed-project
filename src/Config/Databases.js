const Pool = require('pg-pool')

const mydb = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST
})

module.exports = mydb