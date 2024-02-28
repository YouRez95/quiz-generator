// Importation
import dotenv from "dotenv";
dotenv.config()
import cors from 'cors'
import express from "express";
import mongoose from "mongoose";
import connectToDb from "./db/connection.js";
import userRoutes from "./routes/userRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
// Create the server
const app = express();


// middelware
app.use(express.static('public'))
app.use(cors());
app.use(express.json())


// Routes

app.use('/api/v1/user', userRoutes)

app.use('/api/v1/quiz', quizRoutes)

// Run the server
const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL

connectToDb(MONGO_URL).then(() => {
  app.listen(PORT, () => {
    console.log('server listening on port ' + PORT)
  })
})






