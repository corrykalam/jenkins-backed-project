const model = require("../Model/Users")
const bcrypt = require("bcrypt");
const Auth = {}

Auth.login = async (req, res) => {
    try {
        const detailUsers = await model.getDetail(req.body.username)
        if (detailUsers.length == 0) {
            return res.status(200).json({ success: true, message: "Username not exist in database." })
        }
        const requestPass = req.body.password
        const check = await bcrypt.compare(requestPass, detailUsers[0].password)
        if (check) {
            const payload = {
                username: detailUsers[0].username,
                role: detailUsers[0].role
            }
            const genToken = await model.genToken(payload)
            await model.setToken(detailUsers[0].username, genToken)
            return res.status(200).json({ success: true, token: genToken, message: "Logged in user successfully.", })
        } else {
            return res.status(200).json({ success: true, message: "Logged in user failed." })
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: err })
    }
}

module.exports = Auth