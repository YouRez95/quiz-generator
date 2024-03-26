import {Schema, model, Types} from 'mongoose'
import User from './user.js';

const NotificationSchema = new Schema({
  senderId: {
    type: Types.ObjectId,
    required: true,
    ref: User
  },
  receiverId: {
    type: Types.ObjectId,
    required: true,
    ref: User
  },
  notificationType: {
    type: String,
    required: true
  },
  quizName: {
    type: String,
    required: true
  },
  text: String,
})

const NotificationModel = model('Notification', NotificationSchema);

export default NotificationModel;