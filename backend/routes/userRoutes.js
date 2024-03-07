import { Router } from "express";
import { postUserLogin, postUserSignup, getMyQuizzes, changeUserProfile, getMyQuizzesDraft, likeQuiz } from "../controllers/userControllers.js";
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
*/

router.post('/like-quiz', isAuthenticated, likeQuiz)

/* 
@desc delete user
@route GET -> /api/v1/quiz/:id
@access Public
@responses
    201: description: Created
    409: description: Conflict
    404: description: Not Found
    500: desccription: Server Error
*/


export default router;