import { Router } from "express";
import { postUserLogin, postUserSignup, getMyQuizzes, changeUserProfile, getMyQuizzesDraft, likeQuiz, postCommentQuiz, getCommentQuiz, postTheScoreQuiz, updateQuiz } from "../controllers/userControllers.js";
import { validationLogin, validationSignUp } from "../utils/validation.js";
import isAuthenticated from "../middelwares/isAuth.js";
const router = Router();

// POST -> /api/v1/user/signup
router.post('/signup',validationSignUp, postUserSignup);

// POST -> /api/v1/user/login
router.post('/login', validationLogin,postUserLogin);

/* 
@desc Get the quizzes for specific user
@route GET -> /api/v1/user/quizzes
@access Private
@responses
    200: {message: "success", data: [...]}
    500: {message: "Something Wrong Try Again Later"}
*/

router.get('/quizzes', isAuthenticated, getMyQuizzes)

/* 
@desc Get the quizzes for specific user
@route GET -> /api/v1/user/draft
@access Private
@responses
    200: {message: "success", data: [...]}
    500: {message: "Something Wrong Try Again Later"}
*/

router.get('/draft', isAuthenticated, getMyQuizzesDraft)


/* 
@desc Update the profile user
@route POST -> /api/v1/user/profile
@access Private
@responses
    201: {message: "success", user: userDataUpdated}
    500: {message: 'Something Wrong Try Again Later'}
*/
router.put('/profile', isAuthenticated, changeUserProfile)


/* 
@desc user can like quiz
@route PUT -> /api/v1/user/like-quiz
@access Private
@responses
    200: {message: "OK", quiz: quizLiked}
    500: {message: "something wrong try again later"}
*/
router.post('/like-quiz', isAuthenticated, likeQuiz)

/* 
@desc user can comment quiz
@route POST -> /api/v1/user/comment-quiz
@access Private
@responses
    
*/
router.post('/comment-quiz', isAuthenticated, postCommentQuiz)


/* 
@desc user can see comments quiz
@route GET -> /api/v1/user/comment-quiz/:quizId
@access Private
@responses
    
*/
router.get('/comment-quiz/:quizId', isAuthenticated, getCommentQuiz)


/* 
@desc user can see comments quiz
@route POST -> /api/v1/user/score-quiz/:quizId
@access Private
@responses
    
*/
router.post('/score-quiz/:quizId', isAuthenticated, postTheScoreQuiz)


/* 
@desc user can see comments quiz
@route PUT -> api/v1/user/update-quiz/:quizId
@access Private
@responses
    
*/
router.put('/update-quiz/:quizId', isAuthenticated, updateQuiz);


export default router;