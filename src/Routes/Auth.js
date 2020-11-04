const express = require("express")
const controller = require("../Controller/Auth")
const Route = express.Router()

// Route.get("/", controller.all)
Route.post("/", controller.login)

module.exports = Route