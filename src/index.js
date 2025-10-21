const express = require('express')
const { conexionMongoDB } = require('./db/mongoose')
const serieRouter = require('./routes/seriesRoutes')

const app = express()
app.use(express.json())

app.use('/series', serieRouter)

const user = "admin"
const pass = "admin123"
const db   = "seriesdb"
const URI = `mongodb://${user}:${pass}@localhost:27017/${db}?authSource=admin`

const PORT = 3000
app.listen(PORT, async () => {
    await conexionMongoDB(URI)
    console.log('Servidor corriendo en el puerto ' + PORT)
})