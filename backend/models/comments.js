import {Schema, model, Types} from 'mongoose'
import Quiz from './quiz.js'
import User from './user.js'

const CommentSchema = new Schema({
  quizId: {
    type: Types.ObjectId,
    ref: Quiz
  },
  userId: {
    type: Types.ObjectId,
    ref: User
  },
  text: {
    type: String,
    required: true
  }
}, {timestamps: true});


const Comment = model('Comment', CommentSchema);
export default Comment;