import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodbConnection.js'
import connectCloudinary from './config/cloudinary.js'

// App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// Middlewares

app.use(express.json())
app.use(cors())


//apu endpoints

app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(port, () => console.log('Server started on port:' + port))