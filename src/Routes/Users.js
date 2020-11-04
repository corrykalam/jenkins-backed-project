const express = require("express")
const controller = require("../Controller/Users")
const Route = express.Router()

Route.get("/", controller.all)
Route.get("/detail/:username", controller.detail)
Route.get("/search", controller.detailId)
Route.post("/", controller.add)
Route.delete("/", controller.delete)

module.exports = Route