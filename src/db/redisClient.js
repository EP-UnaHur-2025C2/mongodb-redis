const { createClient } = require('redis')

const REDIS_URL = 'redis://default:redis123@localhost:6379'

const client = createClient({ url: REDIS_URL })
client.on('error', (err) => console.error('Redis error: ', err))

async function connectRedis() {
    await client.connect()
}

module.exports = { client, connectRedis }