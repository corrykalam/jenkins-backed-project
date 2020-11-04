const jwt = require("jsonwebtoken")
const jwt_decode = require("jwt-decode")
const model = require("../Model/Users")

module.exports = function (...role) {
    return function (req, res, next) {
        if (role.length == 0) {
            role = "ALL"
        }
        const { token } = req.headers
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized." })
        }
        const jwtData = jwt_decode(token)
        console.log(jwtData)
        jwt.verify(token, process.env.JWT_KEYS, async (err, decode) => {
            try {
                if (err) {
                    if (err.message == "jwt expired") {
                        const detailUsers = await model.getDetail(jwtData.username)
                        if (token == detailUsers[0].token) {
                            const payload = {
                                username: detailUsers[0].username,
                                role: detailUsers[0].role
                            }
                            const genToken = await model.genToken(payload)
                            await model.setToken(detailUsers[0].username, genToken)
                            next()
                        }
                    } else {
                        const genToken = await model.genToken(payload)
                        await model.setToken(detailUsers[0].username, genToken)
                        return res.status(401).json({ success: false, message: "New token success generate.", token: genToken })
                    }
                }
                if (role.includes(jwtData.role) || role == "ALL") {
                    next()
                } else {
                    return res.status(401).json({ success: false, message: "You not have permission to access this page." })
                }
            } catch (err) {
                return res.status(401).json({ success: false, message: "Your token not validate." })
            }
        })
    }
}