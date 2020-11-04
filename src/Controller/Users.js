const model = require("../Model/Users")
const Users = {}

Users.all = async (req, res) => {
    try {
        const data = await model.getAll()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

Users.detail = async (req, res) => {
    try {
        const { username } = req.params
        const data = await model.getDetail(username)
        if (data.rowCount != 0) {
            return res.send(data)
        } else {
            return res.status(500).send({ success: false, message: `No data with username ${username}` })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

Users.detailId = async (req, res) => {
    try {
        const { id } = req.query
        const data = await model.getId(id)
        if (data.rowCount > 0) {
            return res.send(data.rows)
        } else {
            return res.status(500).send({ success: false, message: `No data with id ${username}` })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

Users.add = async (req, res) => {
    try {
        const { username, password, role } = req.body
        const data = await model.addData(username, password, role)
        return res.status(200).json({ success: true })
    } catch (error) {
        if (error.routine.includes("_bt_check_unique")) {
            return res.status(500).json({ success: false, message: "users already exist." })
        } else {
            return res.status(500).json(error)
        }
    }
}

Users.delete = async (req, res) => {
    try {
        const { id } = req.query
        const data = await model.Delete(id)
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = Users