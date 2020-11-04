const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const result = await bcrypt.hash(password, salt)
        return result
    } catch (error) {
        throw error
    }
}

module.exports = hashPassword