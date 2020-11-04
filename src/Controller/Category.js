const model = require("../Model/Category")
const Category = {}

Category.all = async (req, res) => {
    try {
        const data = await model.GetAll()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

Category.add = async (req, res) => {
    try {
        const { name } = req.body
        const data = await model.Add(name)
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(500).json(error.routine)
    }

}

Category.edit = async (req, res) => {
    try {
        const { id, name } = req.body
        const data = await model.Edit(id, name)
        return res.send({ success: true, message: "Update successfuly." })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

Category.delete = async (req, res) => {
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
module.exports = Category