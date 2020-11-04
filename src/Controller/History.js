const model = require("../Model/History")
const redis = require("../Config/Redis")
const History = {}

History.all = async (req, res) => {
    try {
        const data = await model.GetAll()
        const data_redis = JSON.stringify(data)
        redis.setex("productAll", 30, data_redis)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

History.add = async (req, res) => {
    try {
        const { invoice, date, orders, amount, cashier } = req.body
        const data = await model.Add(invoice, date, orders, amount, cashier)
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(500).json(error.routine)
    }

}

History.edit = async (req, res) => {
    try {
        const { id, invoice, date, orders, amount } = req.body
        const data = await model.Edit(id, invoice, date, orders, amount)
        return res.send({ success: true, message: "Update successfuly." })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

History.delete = async (req, res) => {
    try {
        const { id } = req.body
        const data = await model.Delete(id)
        if (data.rowCount > 0) {
            return res.send({ success: true, message: "Delete successfuly." })
        } else {
            return res.status(500).send({ success: false, message: `No data with id ${id}` })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}
module.exports = History