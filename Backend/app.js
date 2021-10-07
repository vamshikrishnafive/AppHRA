import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import store from './routers/Apis.routers.js'

dotenv.config()
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/api/v1/apphra', store)
app.use("*", (req, res) => res.status(404).send({ error: "Page not found" }))

mongoose.connect(process.env.MONGODB_URI)
    .then(() => app.listen(port, () => console.log(`Connected to Database\napp listening on port ${port}!`)))
    .catch((error) => console.error(error))
