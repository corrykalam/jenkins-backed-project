const database = require("../Config/Databases")
const jwt = require("jsonwebtoken")
const hashPassword = require("../Helpers/hash")
const Users = {}

Users.getAll = () => {
    return new Promise((resolve, reject) => {
        database
            .query("SELECT u.id, u.username, u.password, u.token, r.role FROM users u INNER JOIN role r ON u.role = r.id;")
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

Users.getDetail = (username) => {
    return new Promise((resolve, reject) => {
        database
            .query(`SELECT u.id, u.username, u.password, u.token, r.role FROM users u INNER JOIN role r ON u.role = r.id WHERE username = '${username}'`)
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

Users.getId = (username) => {
    return new Promise((resolve, reject) => {
        database.query(`SELECT * FROM users WHERE id = '${username}'`)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

Users.addData = (username, password, role) => {
    return new Promise(async (resolve, reject) => {
        const passwordHash = await hashPassword(password)
        database.query(`INSERT INTO users(username, password, role) VALUES ('${username}','${passwordHash}', ${role})`)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

Users.Delete = (idUsers) => {
    return new Promise((resolve, reject) => {
        database.query(`DELETE FROM public.users WHERE id = ${idUsers}`)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

Users.genToken = async (payload) => {
    try {
        const token = jwt.sign(payload, process.env.JWT_KEYS, { expiresIn: 30 })
        return token
    } catch (err) {
        throw err
    }
}

Users.setToken = (username, token) => {
    return new Promise((resolve, reject) => {
        database.query(`UPDATE users SET token = '${token}' WHERE username = '${username}'`)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

module.exports = Users