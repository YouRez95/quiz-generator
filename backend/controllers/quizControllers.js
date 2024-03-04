import Question from "../models/question.js";
import Quiz from "../models/quiz.js";
import mongoose from "mongoose";


function isValidId(id) {
 return mongoose.Types.ObjectId.isValid(id)
}

// POST -> /api/v1/quiz/create
export async function createQuiz(req, res){
  try {
    const {title, description, category, publicQuiz, numQuestion} = req.body;
    if (!title || !description || !category || !numQuestion || !req.file) {
      const error = new Error();
      error.statusCode = 400;
      error.message = 'All Input Required';
      throw error;
    }
    const [,...rest] = req.file.path.split('/')
    const urlImage = rest.join('/')
    const backImage = urlImage
    const userId = req.userId
    const quizCreated = await Quiz.create({title, description, backImage, category, publicQuiz, userId, numQuestion});
    res.status(200).json({message: "success", quizId: quizCreated._id});
  } catch (err) {
    res.status(err.statusCode || 500).json({message: err.message || "Something wrong try again"})
  }
}

// GET -> /api/v1/quiz/number/:id
export async function getTheTotalNumberOfQuestionInQuiz(req, res) {
  const {id } = req.params;
  try {
    const quizExist = await Quiz.findById(id);
    if (!quizExist) {
      const error = new Error('Quiz Not Found')
      error.statusCode = 404
      throw error;
    }
    return res.status(200).json({numOfQuestions: quizExist.numQuestion})
  }
  catch(err) {
    return res.status(err.statusCode || 500).json({message: err.message || "Something wrong try again later"});
  }
}

// POST -> /api/v1/quiz/:id
export async function createQuestion(req, res) {
  const {id} = req.params;
  const {question, correctAnswer, answerOptions} = req.body;
  try {
    if (!question || !correctAnswer || answerOptions.length === 0) {
      const error = new Error("Question, Answer, Minimum one option is required");
      error.statusCode = 400;
      throw error;
    }
    const quizExist = await Quiz.findById(id);
    if (!quizExist) {
      const error = new Error('Quiz Not Found')
      error.statusCode = 404
      throw error;
    }

    await Question.create({question, correctAnswer, answerOptions, quizId: id});
    const questionsFounded = await Question.find({quizId: id});

    if (quizExist.numQuestion <= questionsFounded.length) {
      quizExist.isComplete = true;
      await quizExist.save();
    } 
    return res.status(201).json({message: "Question Created", numQuestion: quizExist.numQuestion, isComplete: quizExist.isComplete})
  } catch(err) {

    return res.status(err.statusCode || 500).json({message: err.message || "Something Wrong Try Again Later"})
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

// GET -> /api/v1/quiz/popularQuiz
export async function getPopularQuizzes(req, res) {

  try  {
    const popularQuizzes = await Quiz.aggregate([
      {
        $match: {
          publicQuiz: true, isComplete: true
        }
      },
      { $addFields: {
          totalLikesComments: { $add: [ '$totalLikes', '$totalComments' ] }
        }
      },
      {$sort: {totalLikesComments: -1}},
      {$limit: 10}
    ]);

    return res.status(200).json({message: "success", data: popularQuizzes})

  } catch(err) {
    console.log(err);
    res.status(500).json({message: 'Something went wrong try again later', err: err})
  }
}

// GET -> /api/v1/quiz/search/:topic

export async function getQuizzesByTopic(req, res) {
  const {topic} = req.params;


  try {
    let quizByTopic;
    if (topic === 'Other') {
      const topicsExcluded = ["Mathematics", "Science", "History", "Technology", "Sports"]
      quizByTopic = await Quiz.find({ category: { $nin: topicsExcluded }, isComplete: true, publicQuiz: true})
    } else {
      quizByTopic = await Quiz.find({ category: { $in: topic }, isComplete: true, publicQuiz: true})
    }

    return res.status(200).json({data: quizByTopic})
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "Something Wrong Try Again Later"});
  }
  


  
}








