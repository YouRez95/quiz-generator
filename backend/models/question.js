import mongoose, { Schema, model } from "mongoose";
import Quiz from './quiz.js';

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  quizId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: Quiz
  },
  correctAnswer: {
    type: String,
    required: true
  },
  answerOptions: {
    type: [String],
    required: true
  }
}, {timestamps: true})


const Question = model('Question', QuestionSchema);

export default Question;