const express = require("express")
const controller = require("../Controller/History")
const Route = express.Router()

Route.get("/", controller.all)
Route.post("/", controller.add)
Route.put("/", controller.edit)
Route.delete("/", controller.delete)

module.exports = Route