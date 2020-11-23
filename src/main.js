const express = require("express")
const product = require('./Routes/Product')
const history = require('./Routes/History')
const category = require('./Routes/Category')
const users = require('./Routes/Users')
const auth = require('./Routes/Auth')
const Routes = express.Router()

Routes.use("/v1/product", product)
Routes.use("/v1/history", history)
Routes.use("/v1/category", category)
Routes.use("/v1/users", users)
Routes.use("/v1/auth", auth)



module.exports = Routes