const redis = require("redis")

const myRedis = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
})

module.exports = myRedis