require("dotenv/config")
const redis = require("./src/Config/Redis")
const express = require("express")
const server = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require("./src/main")
const cors = require('cors')
const database = require("./src/Config/Databases")
const port = process.env.PORT


server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(morgan("dev"))
server.use(cors())
server.use("/public", express.static("public"))

server.use(routes)

database.connect()
    .then((result) => {
        console.log("Database connected")
    })
    .catch((err) => {
        console.log("Database not connected")
    });

redis.get("testkey", (err, res) => {
    if (err) {
        console.log(err)
    }
    if (res === "OK" || res === null) {
        console.log("Connection to Redis successfully.")
    }
}
)

server.get("/", (req, res) => {
    res.send("API connected.")
})

server.listen(port, () => {
    console.log(`Service running on port http://localhost:${port}`)
})