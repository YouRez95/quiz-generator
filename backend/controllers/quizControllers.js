import Question from "../models/question.js";
import Quiz from "../models/quiz.js";
import mongoose from "mongoose";
import LikeModel from "../models/likes.js";


export function isValidId(id) {
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

// GET -> /api/v1/quiz/quizzes
export async function getMyQuizzes(req, res) {
  try {
    const userId = req.userId;
    const quizzes = await Quiz.find({userId, isComplete: true}).sort({'createdAt': -1})
    res.status(200).json({message: "success", data: quizzes})
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Something Wrong Try Again Later'})
  }
}

// GET -> /api/v1/quiz/draft
export async function getMyQuizzesDraft(req, res) {
  try {
    const userId = req.userId;
    const quizzes = await Quiz.find({userId, isComplete: false}).select('-userId -isComplete -totalLikes -totalComments -publicQuiz')

    const quizzesToSend = []
    for (const quiz of quizzes) {
      const questionFounded = await Question.countDocuments({quizId: quiz._id})
      quizzesToSend.push({...quiz._doc, totalQuestionFounded: questionFounded})
    }

    res.status(200).json({message: "success", data: quizzesToSend})
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Something Wrong Try Again Later'})
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

// POST -> /api/v1/quiz/add-question/:quizId
export async function addQuestionFromDashboard(req, res) {
  const {quizId} = req.params;
  const {question, correctAnswer, answerOptions, draft} = req.body;
  try {
    if (!question || !correctAnswer || answerOptions.length === 0) {
      const error = new Error("Question, Answer, Minimum one option is required");
      error.statusCode = 400;
      throw error;
    }
    const quizExist = await Quiz.findById(quizId);
    if (!quizExist) {
      const error = new Error('Quiz Not Found')
      error.statusCode = 404
      throw error;
    }
    // LOGIC HANDLE THE TWO CASES: 
      // THE COMPLETION OF QUESTION QUIZ
      // THE CREATE NEW QUESTION QUIZ

    let questionCreated;

    if (quizExist.isComplete === false) {
      const newQuestion =  new Question({question, correctAnswer, answerOptions, quizId});
      questionCreated = await newQuestion.save()
      const totalQuestion = quizExist.numQuestion;
      const questionsLength = await Question.countDocuments({quizId})
      if (totalQuestion === questionsLength) {
        quizExist.isComplete = true;
        await quizExist.save();
      }
    } else {
      const newQuestion =  new Question({question, correctAnswer, answerOptions, quizId})
      questionCreated = await newQuestion.save()
      quizExist.numQuestion += 1;
      await quizExist.save();
    }
    res.status(201).json({message: "question created succefully", _id: questionCreated._id})
  }
  catch(err) {
    return res.status(err.statusCode || 500).json({message: err.message || "Something Wrong Try Again Later"})
  }
} 


// GET -> /api/v1/quiz/:id
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

    if (quiz.publicQuiz === false || quiz.isComplete === false) {
      const error = new Error()
      error.statusCode = 401;
      error.message = "Unauthorized";
      throw error
    }

    const questions = await Question.find({quizId: quiz._id});
    
    // const quizData = {
    //   title: quiz.title,
    //   description: quiz.description,
    //   backImage: quiz.backImage,
    //   totalLikes: quiz.totalLikes,
    //   totalComments: quiz.totalComments,
    //   questions: questions.map(q => ({question: q.question, correctAnswer: q.correctAnswer, answerOptions: q.answerOptions}))
    // }

    res.status(200).json({message: 'success', data: {quiz,questions}})
  } catch(err) {
    return res.status(err.statusCode || 500).json({message: err.message});
  }
}

// GET -> /api/v1/quiz/update/:id
export async function getSingleQuizToUpdate(req, res){

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

    if (quiz.userId.toString() !== req.userId.toString()) {
      const error = new Error()
      error.statusCode = 401;
      error.message = "Unauthorized";
      throw error
    }

    const questions = await Question.find({quizId: quiz._id});

    res.status(200).json({message: 'success', data: {quiz,questions}})
  } catch(err) {
    return res.status(err.statusCode || 500).json({message: err.message || "something wrong try again later"});
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
      {$limit: 10},
      {$lookup : {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }},
      {
        //turn the array produced by lookup to object
        $unwind: '$user'
      },
      {
        // include the necessary fields
        $project: {
          '_id': 1,
          'title': 1,
          'userId': 1,
          'description': 1,
          'category': 1,
          'publicQuiz': 1,
          'backImage': 1,
          'numQuestion': 1,
          'totalLikes': 1,
          'totalComments': 1,
          'createdAt': 1,
          'updatedAt': 1,
          'user.username': 1
        }
      }
    ]);

    return res.status(200).json({message: "success", data: popularQuizzes})

  } catch(err) {
    console.log(err);
    res.status(500).json({message: 'Something went wrong try again later', err: err})
  }
}

// GET -> /api/v1/quiz/auth/popularQuiz
export async function getPopularQuizzesAuth(req, res) {
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
      {$limit: 10},
      {$lookup : {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }},
      {
        //turn the array produced by lookup to object
        $unwind: '$user'
      },
      {
        // include the necessary fields
        $project: {
          '_id': 1,
          'title': 1,
          'userId': 1,
          'description': 1,
          'category': 1,
          'publicQuiz': 1,
          'backImage': 1,
          'numQuestion': 1,
          'totalLikes': 1,
          'totalComments': 1,
          'createdAt': 1,
          'updatedAt': 1,
          'user.username': 1
        }
      }
    ]);

    for (let i = 0; i < popularQuizzes.length; i++) {
      if (popularQuizzes[i].userId.toString() === req.userId.toString()) {
        popularQuizzes[i].isMine = true;
      } else {
        popularQuizzes[i].isMine = false;
      }

      const isLiked = await LikeModel.findOne({ quizId: popularQuizzes[i]._id, userId: req.userId });
      popularQuizzes[i].isLiked = isLiked ? true : false;
    }

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
      quizByTopic = await Quiz.find({ category: { $nin: topicsExcluded }, isComplete: true, publicQuiz: true}).populate('userId', 'username')
    } else {
      quizByTopic = await Quiz.find({ category: { $in: topic }, isComplete: true, publicQuiz: true}).populate('userId', 'username')
    }

    return res.status(200).json({data: quizByTopic})
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "Something Wrong Try Again Later"});
  }
}

// GET -> /api/v1/quiz/search/auth/:topic
export async function getQuizzesByTopicAuth(req, res) {
  const {topic} = req.params;
  try {
    let quizByTopic;
    if (topic === 'Other') {
      const topicsExcluded = ["Mathematics", "Science", "History", "Technology", "Sports"]
      quizByTopic = await Quiz.find({ category: { $nin: topicsExcluded }, isComplete: true, publicQuiz: true}).populate('userId', 'username')
    } else {
      quizByTopic = await Quiz.find({ category: { $in: topic }, isComplete: true, publicQuiz: true}).populate('userId', 'username')
    }

    for (let i = 0; i < quizByTopic.length; i++) {
      if (quizByTopic[i].userId._id.toString() === req.userId.toString()) {
        quizByTopic[i].isMine = true;
      } else {
        quizByTopic[i].isMine = false;
      }

      const isLiked = await LikeModel.findOne({ quizId: quizByTopic[i]._id, userId: req.userId });
      quizByTopic[i].isLiked = isLiked ? true : false;
    }

    return res.status(200).json({ data: quizByTopic.map(quiz => ({ ...quiz.toObject(), isMine: quiz.isMine, isLiked: quiz.isLiked })) });
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "Something Wrong Try Again Later"});
  }
}









