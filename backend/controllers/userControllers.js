import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from "../models/user.js";
import { validationResult } from "express-validator";
import Quiz from '../models/quiz.js';
import Question from '../models/question.js';
import LikeModel from '../models/likes.js';
import Comment from '../models/comments.js';
import { isValidId } from './quizControllers.js';
import Score from '../models/scoreUser.js';
import fs from 'fs';
import path from 'path';


// POST -> /api/v1/user/signup
export async function postUserSignup(req, res){
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.status(400).json({errors: result.array()});
  }

  const {email, username, fullname, avatar, password} = req.body
  try {
    await User.create({
      email, username, fullname, avatar, password
    })
  } catch(err) {
    if(err.code === 11000) {
      const key = Object.keys(err.keyValue)[0]
      return res.status(400).json({errors: [{ path: key, value: err.keyValue[key], msg: key + " already in use" }]})
    }
    return res.status(500).json({errors: 'An error occured try again later'})
  }

  res.status(201).json({message: 'user created successfully'})
}

// POST -> /api/v1/user/login
export async function postUserLogin(req, res) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({errors: result.array()})
  }
  const {email, password: passwordText} = req.body;

  const user = await User.findOne({email});

  if (!user) {
    return res.status(401).json({errors: [{msg: "Incorrect Email or Password"}]})
  }

  const validPassword = await bcrypt.compare(passwordText, user.password)
  if (!validPassword) {
    return res.status(401).json({errors: [{msg: "Incorrect Email or Password"}]})
  }
  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
  const {password, ...rest} = user._doc
  res.status(200).json({message: "login success", data: {user: rest, token: token }})
}



// POST -> /api/v1/user/profile
export async function changeUserProfile(req, res) {
  try {
    const {username, fullname, avatar} = req.body;
    const user = await User.findById(req.userId).select('-password -email')

    if (username && (username !== user.username)) {
      user.username = username;
    }
  
    if (fullname && (fullname !== user.fullname)) {
      user.fullname = fullname;
    }
  
    if (avatar && (avatar !== user.avatar)) {
      user.avatar = avatar;
    }
  
    const userUpdated = await user.save();
    res.status(200).json({message: "success", user: userUpdated})
  } catch(err) {
    console.log(err);
    res.status(500).json({message: 'Something Wrong Try Again Later'})
  }
}


// POST -> /api/v1/user/like-quiz
export async function likeQuiz(req, res) {

  try {
    const userId = req.userId;
    const { quizId } = req.body;

    const isLiked = await LikeModel.findOne({quizId, userId});
    const quizLiked = await Quiz.findById(quizId);
    if (isLiked){
      await LikeModel.findByIdAndDelete(isLiked._id);
      quizLiked.totalLikes--;
    } else {
      await LikeModel.create({userId, quizId});
      quizLiked.totalLikes++;
    }
    await quizLiked.save();
    res.status(200).json({message: "OK", quiz: quizLiked});
  } catch (err) {
    res.status(500).json({message: "something wrong try again later"})
  }
}

// POST -> /api/v1/user/comment-quiz
export async function postCommentQuiz(req, res) {
  
  try {
    const userId = req.userId;
    const {quizId, text} = req.body;
  
    if (!quizId || !text) {
      const error = new Error('comment required')
      error.statusCode = 400
      throw error;
    }
    const newComment = await Comment.create({userId, quizId, text});
    if (!newComment) {
      const error = new Error('comment failed to add')
      error.statusCode = 400
      throw error;
    }
    const quizCommented = await Quiz.findById(quizId)
    quizCommented.totalComments += 1;
    await quizCommented.save()
    res.status(200).json({message: "success", data: newComment._doc});
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({message: err.message || "Something wrong try again later"})
  }
}


// GET -> /api/v1/user/comment-quiz/:quizId
export async function getCommentQuiz(req, res) {
  try {
    const {quizId} = req.params;
    if (!isValidId(quizId)) {
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    }
  
    const commentsFounded = await Comment.find({quizId}).sort({'createdAt': -1}).populate('userId', 'username avatar _id');
    if (!commentsFounded) {
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({message: "success", data: commentsFounded});
  } catch(err) {
    res.status(err.statusCode || 500).json({message: err.message || "Something wrong try again later"});
  }
  
}

// POST -> /api/v1/user/score-quiz/:quizId
export async function postTheScoreQuiz(req, res){

  try {
    const {quizId} = req.params;

    if (!isValidId(quizId)) {
      const error = new Error('Quiz Not Found');
      error.statusCode = 404;
      throw error;
    }
  
    const userId = req.userId;
    const {score} = req.body;

    const newScore = await Score.create({userId, quizId, score});
    return res.status(200).json({message: "score created", data: newScore._doc})

  } catch(err) {
    return res.status(err.statusCode || 500).json({message: err.message || "Something wrong try again later"});
  }
}


// PUT -> api/v1/user/update-quiz/:quizId
export async function updateQuiz(req, res){

  try {
    const {quizId} = req.params;
    const {title, description, category, publicQuiz} = req.body;
  
    const quiz = await Quiz.findById(quizId)
    if (!quiz) {
      const error = new Error('Quiz Not Found')
      error.statusCode = 404;
      throw error;
    }
    if (quiz.userId.toString() !== req.userId.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      throw error;
    }

    if (req.file) {
      const [,...rest] = req.file.path.split('/')
      const urlImage = rest.join('/')
      const backImage = urlImage
      // if user add new image, the old image will be removed from file system
      const __dirname = import.meta.dirname;
      const pathToImage = path.join(__dirname, '..', 'public', quiz.backImage)
      fs.unlink(pathToImage, (err)  => {
        if (err) throw err;
      })
      await Quiz.findByIdAndUpdate(quizId, {title, description, category, publicQuiz, backImage})
    } else {
      await Quiz.findByIdAndUpdate(quizId, {title, description, category, publicQuiz})
    }
    res.status(200).json({message: "success update"})    
  } catch (err) {
    res.status(err.statusCode || 500).json({message: err.message || "Something wrong try again later"})
  }
  
}


// GET -> api/v1/user/my-questions/:quizId
export async function getMyQuestionsForSpecificQuiz(req, res){
  try {
    const userId = req.userId;
    const quizId = req.params.quizId
  
    const quiz = await Quiz.findById(quizId);
  
    if (quiz.userId.toString() !== userId.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401
      throw error;
    }
  
    const questions = await Question.find({quizId});
    res.status(200).json({message: "success", data: questions})
  } catch(err){
    res.status(err.statusCode || 500).json({message: err.message || "Something Wrong try again later"});
  }
  
}

// PUT -> api/v1/user/update-question/:quizId/:questionId
export async function updateMyQuestion(req, res){
  try {
    const quizId = req.params.quizId;
    const userId = req.userId;
    const quiz = await Quiz.findById(quizId);
    if (quiz.userId.toString() !== userId.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      throw error;
    }
    const questionId = req.params.questionId;
    const {question, correctAnswer, answerOptions} = req.body;

    if (answerOptions.includes(undefined) 
      || answerOptions.includes('') 
      || answerOptions.length < 0 
      ||!question || !correctAnswer) {
        const error = new Error('All Inputs and minimum one option are required');
        error.statusCode = 400;
        throw error;
    }
    const questionUpdated = await Question.findByIdAndUpdate(questionId, {question, correctAnswer, answerOptions}, {returnDocument: 'after'})
    res.status(200).json({message: "question updated successfully"});

  } catch (err) {
    res.status(err.statusCode || 500).json({message: err.message || "Someyhing wrong try again later"})
  }
}

// DELETE -> api/v1/user/delete-question/:quizId/:questionId
export async function deleteQuestion(req, res){
  try {
    const quizId = req.params.quizId;
    const userId = req.userId;
    const quiz = await Quiz.findById(quizId);
    if (quiz.userId.toString() !== userId.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      throw error;
    }
    const questionId = req.params.questionId;

    await Question.findByIdAndDelete(questionId);
    quiz.numQuestion -= 1;
    await quiz.save();
    res.status(200).json({message: "question deleted successfully"});
  } catch (err) {
    res.status(err.statusCode || 500).json({message: err.message || "Someyhing wrong try again later"})
  } 
}
