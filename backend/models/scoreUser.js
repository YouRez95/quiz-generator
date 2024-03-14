import { Types ,Schema, model } from 'mongoose';
import User from './user.js';
import Quiz from './quiz.js';


const ScoreSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: User
  },
  quizId: {
    type: Types.ObjectId,
    required: true,
    ref: Quiz
  },
  score: {
    type: String,
    required: true
  }
}, {timestamps: true});


const Score = model('Score', ScoreSchema);

export default Score;