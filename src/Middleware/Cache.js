const redis = require("../Config/Redis")

const productAll = (req, res, next) => {
    redis.get("productAll", (err, ress) => {
        if (err) {
            return res.status(500).json({ success: false, message: err.message })
        }
        if (ress !== null) {
            const data_redis = JSON.parse(ress)
            return res.status(200).json(data_redis)
        } else {
            next()
        }
    })
}

module.exports = productAll