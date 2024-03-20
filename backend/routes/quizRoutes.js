import {Router} from 'express'
import { createQuestion, createQuiz, getPopularQuizzes, getSingleQuiz, getTheTotalNumberOfQuestionInQuiz, getQuizzesByTopic, getSingleQuizToUpdate, addQuestionFromDashboard, getQuizzesByTopicAuth, getPopularQuizzesAuth, getMyQuizzes, getMyQuizzesDraft } from '../controllers/quizControllers.js';
import isAuthenticated from '../middelwares/isAuth.js';
const router = Router()


/**
@desc User can create quiz
@route /api/v1/quiz/create
@method POST
@access Private
@responses
    400: Bad request -> {message: 'All Input Required'}
    200: Ok -> {message: "success", quizId: quizCreated._id}
    500: Server error -> {message: "Something Wrong Try Again Later"}
*/
router.post('/create',isAuthenticated, createQuiz);

/**
@desc Get the quizzes for specific user
@route /api/v1/quiz/quizzes
@method GET
@access Private
@responses
    200: Ok -> {message: "success", data: quizzes}
    500: Server error -> {message: "Something Wrong Try Again Later"}
*/
router.get('/quizzes', isAuthenticated, getMyQuizzes)


/**
@desc Get not completed quizzes for specific user
@route /api/v1/quiz/draft
@method GET
@access Private
@responses
    200: Ok -> {message: "success", data: quizzesToSend-And-TotalQuestion}
    500: Server Error -> {message: "Something Wrong Try Again Later"}
*/
router.get('/draft', isAuthenticated, getMyQuizzesDraft)


/**
@desc Get The total of question for specific quiz
@route /api/v1/quiz/number/:id
@method GET
@access Private
@responses
    404: Not found -> Quiz Not found
    200: Ok -> {numOfQuestions: number}
    500: Server Error -> {message: "Something Wrong Try Again Later"}
*/
router.get('/number/:id',isAuthenticated, getTheTotalNumberOfQuestionInQuiz);


/**
@desc Get The total of question for specific quiz
@route /api/v1/quiz/:id
@method POST
@access Private
@responses
    400: Validation failed -> {message: "Question, Answer, Minimum one option is required"}
    404: Not found -> {message: "quiz not found"}
    201: Created -> {message: "Question Created", numQuestion: number, isComplete: boolean}
    500: Server Error -> {message: "Something Wrong Try Again Later"}
*/
router.post('/:id',isAuthenticated, createQuestion);


/**
@desc add question from dashboard user
@route /api/v1/quiz/add-question/:quizId
@method POST
@access private
@responses
    400: Validation failed -> {message: "Question, Answer, Minimum one option is required"}
    404: Not found -> {message: "Quiz not found"}
    201: Created -> {message: "question created succefully", _id: questionCreated._id}
    500: Server Error -> {message: "Something Wrong Try Again Later"}
*/
router.post('/add-question/:quizId', isAuthenticated, addQuestionFromDashboard)


/**
@desc update quiz
@route /api/v1/quiz/update/:id
@method GET
@access Private
@responses
    404: Not found -> {message: "Quiz not found"}
    401: Unauthorized -> {message: "Unauthorized"}
    200: OK -> {message: 'success', data: {quiz,questions}}
    500: Server Error -> {message: "Something Wrong Try Again Later"}
*/
router.get('/update/:id',isAuthenticated, getSingleQuizToUpdate);


/**
@desc get the then popular quizzes
@route /api/v1/quiz/popularQuiz
@method GET
@access Public
@responses
    200: OK -> {message: "success", data: popularQuizzes}
    500: Server Error -> {message: "Something Wrong Try Again Later"}
*/
router.get('/popularQuiz', getPopularQuizzes);



/**
@desc get the then popular quizzes
@route /api/v1/quiz/auth/popularQuiz
@method GET
@access Private
@responses
    200: OK -> {message: "success", data: popularQuizzes}
    500: Server Error -> {message: "Something Wrong Try Again Later"}
*/
router.get('/auth/popularQuiz', isAuthenticated, getPopularQuizzesAuth);


/**
@desc get quizzes by topic params
@route /api/v1/quiz/search/:topic
@method GET
@access Public
@responses
    200: OK -> {message: "success", data: quizByTopic}
    500: Server Error -> {message: "Something Wrong Try Again Later"}
*/
router.get('/search/:topic', getQuizzesByTopic)



/**
@desc get quizzes by topic params
@route /api/v1/quiz/search/auth/:topic
@method GET
@access Private
@responses
    200: OK -> {message: "success", data: quizByTopic}
    500: Server Error -> {message: "Something Wrong Try Again Later"}
*/
router.get('/search/auth/:topic', isAuthenticated, getQuizzesByTopicAuth)

/**
@desc get the quiz and the question
@route /api/v1/quiz/:id
@method GET
@access Public
@responses
    404: Not found -> {message: "Quiz not found"}
    401: Unauthorized(quiz is private or not complete) -> {message: "Unauthorized"}
    200: OK -> {message: 'success', data: {quiz,questions}
    500: Server Error -> {message: "Something Wrong Try Again Later"}
*/
router.get('/:id', getSingleQuiz);


export default router