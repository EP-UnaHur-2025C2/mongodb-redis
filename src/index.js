const express = require('express')
const { conexionMongoDB } = require('./db/mongoose')
const { connectRedis } = require('./db/redisClient')
const serieRouter = require('./routes/seriesRoutes')
const productoraRouter = require('./routes/productorasRoutes')

const app = express()
app.use(express.json())

app.use('/series', serieRouter)
app.use('/productoras', productoraRouter)

const user = "admin"
const pass = "admin123"
const db   = "seriesdb"
const URI = `mongodb://${user}:${pass}@localhost:27017/${db}?authSource=admin`

const PORT = 3000
app.listen(PORT, async () => {
    await conexionMongoDB(URI)
    await connectRedis()
    console.log('Redis conectado')
    console.log('Servidor corriendo en el puerto ' + PORT)
})