const express = require("express")
const controller = require("../Controller/Auth")
const Route = express.Router()

Route.post("/", controller.login)

module.exports = Route