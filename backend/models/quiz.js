import mongoose, { Schema, model } from "mongoose";
import User from "./user.js";

const QuizSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: User
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: [String],
    required: true
  },
  publicQuiz: {
    type: Boolean,
    required: true
  },
  backImage: {
    type: String,
    required: true
  },
  numQuestion: {
    type: Number,
    required: true
  },
  totalLikes: {
    type: Number,
    default: 0
  },
  totalComments: {
    type: Number,
    default: 0
  },
  isComplete: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})


const Quiz = model('Quiz', QuizSchema);

export default Quiz;