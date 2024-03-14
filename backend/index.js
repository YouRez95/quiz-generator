// Importation
import dotenv from "dotenv";
dotenv.config()
import cors from 'cors'
import express from "express";
import mongoose from "mongoose";
import multer from 'multer'
import http from 'http';
import {Server} from 'socket.io'
import connectToDb from "./db/connection.js";
import userRoutes from "./routes/userRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import { init } from "./socket.js";
// Create the server
const app = express();

// multer configuration

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/quizBackground')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

app.get('/', (req, res) => {
  res.send('Is Working')
})

// middelware
app.use(express.static('public'))
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(multer({storage: fileStorage, fileFilter}).single('backImage'))
// Routes

app.use('/api/v1/user', userRoutes)

app.use('/api/v1/quiz', quizRoutes)



// Run the socket server
const server = http.createServer(app)
const io = init(server);

io.on('connect', (socket) => {
  console.log('Client connected');
})


// Run the server
const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL

connectToDb(MONGO_URL).then(() => {
  server.listen(PORT, () => {
    console.log('server listening on port ' + PORT)
  })
})






