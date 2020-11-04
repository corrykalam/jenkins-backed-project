const model = require("../Model/Product")
const redis = require("../Config/Redis")
const Product = {}

Product.all = async (req, res) => {
    try {
        const data = await model.GetAll()
        redis_data = JSON.stringify(data)
        redis.setex("productAll", 30, redis_data)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

Product.detail = async (req, res) => {
    try {
        const id = req.params.id
        const data = await model.Detail(id)
        if (data.rowCount > 0) {
            return res.send(data.rows)
        } else {
            return res.status(500).send({ success: false, message: `No data with id ${id}` })
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

Product.add = async (req, res) => {
    try {
        if (req.file === undefined) {
            return res.status(500).json({ status: false, message: "file not found." })
        }
        const { name, price, category } = req.body
        const image = req.file.path
        const data = await model.Add(name, image, price, category)
        return res.status(200).json({ success: true })
    } catch (error) {
        if (error.routine.includes("_bt_check_unique")) {
            return res.status(500).json({ success: false, message: "Name product already on databases." })
        } else {
            return res.status(500).json(error)
        }
    }

}

Product.edit = async (req, res) => {
    try {
        const { id, name, image, price, category } = req.body
        const data = await model.Edit(id, name, image, price, category)
        return res.send({ success: true, message: "Update successfuly." })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

Product.delete = async (req, res) => {
    try {
        const { id } = req.params
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

Product.search = async (req, res) => {
    try {
        const name = req.query.name
        const sensitive = req.query.sensitive
        const data = await model.Search(name, sensitive)
        console.log(data)
        if (data.rowCount > 0) {
            return res.send(data.rows)
        } else {
            return res.send({ success: true, message: "not found." })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

Product.filter = async (req, res) => {
    try {
        const type = req.query.type
        const orderBy = req.query.order
        const data = await model.Filter(type, orderBy)
        if (data != false) {
            return res.send(data.rows)
        } else {
            return res.send({ success: false, message: "wrong query." })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = Product