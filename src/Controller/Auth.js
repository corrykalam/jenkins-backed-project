const model = require("../Model/Users")
const bcrypt = require("bcrypt");
const Auth = {}

Auth.login = async (req, res) => {
    try {
        const detailUsers = await model.getDetail(req.body.username)
        if (detailUsers.length != 0) {
            const requestPass = req.body.password
            const check = await bcrypt.compare(requestPass, detailUsers[0].password)
            console.log(check)
            if (check == true) {
                const payload = {
                    username: detailUsers[0].username,
                    role: detailUsers[0].role
                }
                console.log("1 auth")
                const genToken = await model.genToken(payload)
                console.log("2 auth")
                await model.setToken(detailUsers[0].username, genToken)
                console.log("3 auth")
                return res.status(200).json({ success: true, token: genToken, message: "Logged in user successfully.", })
            } else {
                return res.status(200).json({ success: true, message: "Logged in user failed." })
            }
        } else {
            return res.status(200).json({ success: true, message: "Username not exist in database." })
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: err })
    }
}

module.exports = Auth