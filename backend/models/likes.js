import {Schema, model, Types} from 'mongoose'
import Quiz from './quiz.js';
import User from './user.js';


const LikeSchema = new Schema({
  quizId: {
    type: Types.ObjectId,
    required: true,
    ref: Quiz
  },
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: User
  }
})

const LikeModel = model('Like', LikeSchema);

export default LikeModel;
