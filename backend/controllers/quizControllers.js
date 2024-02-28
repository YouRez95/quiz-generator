import Question from "../models/question.js";
import Quiz from "../models/quiz.js";
import mongoose from "mongoose";


function isValidId(id) {
 return mongoose.Types.ObjectId.isValid(id)
}

// POST -> /api/v1/quiz/create
export async function createQuiz(req, res){

  const {title, description, backImage, category, publicQuiz} = req.body;
  const userId = req.userId

  try {
    const quizCreated = await Quiz.create({title, description, backImage, category, publicQuiz, userId});
    res.status(200).json({message: "succes", quizId: quizCreated._id, backImage});
  } catch (err) {
    console.log(err)
    res.status(500).json({message: err.message})
  }
}

// GET -> get the quiz and the question by id
export async function getSingleQuiz(req, res){

  const {id} = req.params;

  try {
    if (!isValidId(id)){
      const error = new Error()
      error.statusCode = 404;
      error.message = "Quiz Not Found";
      throw error
    }
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      const error = new Error()
      error.statusCode = 404;
      error.message = "Quiz Not Found";
      throw error
    }

    if (quiz.publicQuiz === false) {
      const error = new Error()
      error.statusCode = 401;
      error.message = "Unauthorized";
      throw error
    }

    const questions = await Question.find({quizId: quiz._id});
    
    const quizData = {
      title: quiz.title,
      description: quiz.description,
      backImage: quiz.backImage,
      totalLikes: quiz.totalLikes,
      totalComments: quiz.totalComments,
      questions: questions.map(q => ({question: q.question, correctAnswer: q.correctAnswer, answerOptions: q.answerOptions}))
    }

    res.status(200).json({message: 'success', data: {quiz,questions}})
  } catch(err) {
    return res.status(err.statusCode || 500).json({message: err.message});
  }
}



// POST -> /api/v1/quiz/:id
export async function createQuestion(req, res) {
  const {id} = req.params;
  const {question, correctAnswer, answerOptions} = req.body;
  try {
    const quizExist = await Quiz.findById(id);
    if (!quizExist) return res.status(404).json({message: "Quiz Not Found"});
    await Question.create({question, correctAnswer, answerOptions, quizId: id});
    res.status(200).json({message: "Question Created"})
  } catch(err) {
    console.log(err);
    res.status(500).json({mesage: err.mesage})
  }
}

// GET -> /api/v1/quiz/all-quizzes
export async function getAllQuizzes(req, res) {

  // TO ADD LATER FILER QUIZ BY PUBLIC OR PRIVATE
  // if (quiz.publicQuiz === false) {
  //   const error = new Error()
  //   error.statusCode = 401;
  //   error.message = "Unauthorized";
  //   throw error
  // }

  try  {

  } catch(err) {
    console.log(err);
    res.status(500).json({message: 'Something went wrong try again later', err: err})
  }
  // Popular quizzes sorted by the sum of two fields likes and comments
  const popularQuizzes = await Quiz.aggregate([
    { $addFields: {
        totalLikesComments: { $add: [ '$totalLikes', '$totalComments' ] }
      }
    },
    {$sort: {totalLikesComments: -1}},
    {$limit: 10}
  ]);
  // get the recent quiz date
  const recentQuizzes = await Quiz.find().sort('-createdAt')
  res.status(200).json({data: quizzesByCategory})
}








