// Importation
import dotenv from "dotenv";
dotenv.config()
import cors from 'cors'
import express from "express";
import multer from 'multer'
import http from 'http';
import connectToDb from "./db/connection.js";
import userRoutes from "./routes/userRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import { addNewUser, getUser, init, removeUser } from "./utils/socket.js";
import NotificationModel from "./models/notification.js";

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

// Testing Route
app.get('/', (req, res) => {
  res.send('Welcome...')
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

io.on("connection", (socket) => {
  socket.on("newUser", (data) => {
    addNewUser(data, socket.id)
  });

  socket.on('sendLikeQuiz', async data => {
    const newNotification = await NotificationModel.create({
      senderId: data.senderUserId,
      receiverId: data.receivedUserId,
      notificationType: data.action,
      quizName: data.quizName,
      text: undefined
    })
    if (data.receivedUserId !== data.senderUserId) {
      const receivedUser = getUser(data.receivedUserId)
      const senderUser = getUser(data.senderUserId)
      if (receivedUser?.socketId) {
        socket.to(receivedUser.socketId).emit('receiveLikePost', {_id: newNotification._id, username: senderUser.username, quizName: data.quizName, userAvatar: data.userAvatar, action: data.action})
      }
    }
  })

  socket.on('sendCommentQuiz', async data => {
    const newNotification = await NotificationModel.create({
      senderId: data.senderUserId,
      receiverId: data.receivedUserId,
      notificationType: data.action,
      quizName: data.quizName,
      text: data.textInput
    })
    if (data.senderUserId !== data.receivedUserId) {
      const receivedUser = getUser(data.receivedUserId)
      const senderUser = getUser(data.senderUserId)
      if (receivedUser?.socketId) {
        socket.to(receivedUser.socketId).emit('receiveCommentsPost', {
          _id: newNotification._id,
          userAvatar :data.userAvatar,
          quizName: data.quizName,
          action: data.action,
          text: data.textInput,
          username: senderUser.username
        })
      }
    }
  })


  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});


// Run the server
const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL

connectToDb(MONGO_URL).then(() => {
  server.listen(PORT, () => {
    console.log('server listening on port ' + PORT)
  })
})






