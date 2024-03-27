import { Router } from "express";
import { postUserLogin, postUserSignup, changeUserProfile, likeQuiz, postCommentQuiz, getCommentQuiz, postTheScoreQuiz, updateQuiz, getMyQuestionsForSpecificQuiz, updateMyQuestion, deleteQuestion, getNotification, clearNotification, getStatistique, getQuizAndQuestions, createScore } from "../controllers/userControllers.js";
import { validationLogin, validationSignUp } from "../utils/validation.js";
import isAuthenticated from "../middelwares/isAuth.js";
const router = Router();


/**
 @desc signup the new user
 @route /api/v1/user/signup
 @method POST
 @access Public
 @response
    400: validation failed  -> {errors: [...]}
    500: server error -> {errors: 'An error occured try again later'}
    201: Created -> {message: 'user created successfully'}
 */
router.post('/signup',validationSignUp, postUserSignup);


/**
 @desc login user
 @route /api/v1/user/login
 @method POST
 @access Public
 @response
    400: validation failed  -> {errors: [...]}
    401: Unauthorized -> {errors: [{msg: "Incorrect Email or Password"}]}
    500: server error -> {errors: 'An error occured try again later'}
    200: Ok -> {message: "login success", data: {user: ..., token: ... }}
 */
router.post('/login', validationLogin, postUserLogin);


/**
 @desc Update the profile user
 @route /api/v1/user/profile
 @method POST
 @access Public
 @response
    200: Updated success -> {message: "success", user: userUpdated}
    500: server error -> {message: 'Something Wrong Try Again Later'}
 */
router.put('/profile', isAuthenticated, changeUserProfile)


/**
@desc user can like or dislike quiz
@route /api/v1/user/like-quiz
@method POST
@access Private
@responses
    200: OK -> {message: "OK", quiz: quizLiked}
    500: Server error -> {message: "something wrong try again later"}
*/
router.post('/like-quiz', isAuthenticated, likeQuiz)

/**
@desc user can add comment to quiz
@route /api/v1/user/comment-quiz
@method POST
@access Private
@responses
    400: Bad Request -> {message: "comment required" or "comment failed to add"}
    200: comment added -> {message: "success", data: newComment}
*/
router.post('/comment-quiz', isAuthenticated, postCommentQuiz)


/**
@desc user can see comments quiz
@route /api/v1/user/comment-quiz/:quizId
@method GET
@access Private
@responses
    404: Not Found -> {message: quiz not found}
    200: OK -> {message: "success", data: comments-And-UserWriteComment}
    500: Server error -> {message: "something wrong try again later"}
*/
router.get('/comment-quiz/:quizId', isAuthenticated, getCommentQuiz)


/** 
@desc when user resond to the quiz score will created
@route /api/v1/user/score-quiz/:quizId
@method POST
@access Private
@responses
    404: Not Found -> {message: quiz not found}
    200: OK -> {message: "score created", data: newScore}
    500: Server error -> {message: "something wrong try again later"}
*/
router.post('/score-quiz/:quizId', isAuthenticated, postTheScoreQuiz)


/**
@desc user can see comments quiz
@route api/v1/user/update-quiz/:quizId
@method PUT
@access Private
@responses
    404: Not Found -> {message: "quiz not found"}
    401: Unauthorized -> {message: "Unauthorized"}
    200: Ok -> {message: "succes update"}
    500: Server error -> {message: "something wrong try again later"}
*/
router.put('/update-quiz/:quizId', isAuthenticated, updateQuiz);


/**
@desc user can see all question for specific quiz
@route api/v1/user/my-questions/:quizId
@method GET
@access Private
@responses
    401: Unauthorized -> {message: "Unauthorized"}
    200: Ok -> {message: "succes", data: questions}
    500: Server error -> {message: "something wrong try again later"}
*/
router.get('/my-questions/:quizId', isAuthenticated, getMyQuestionsForSpecificQuiz)


/**
@desc user can update their question
@route api/v1/user/update-question/:quizId/:questionId
@method PUT
@access Private
@responses
    401: Unauthorized -> {message: "Unauthorized"}
    400: Bad request -> {message: "All Inputs and minimum one option are required"}
    200: Ok -> {message: "question updated successfully"}
    500: Server error -> {message: "something wrong try again later"}
*/
router.put('/update-question/:quizId/:questionId', isAuthenticated, updateMyQuestion)


/**
@desc user can delete their question
@route api/v1/user/delete-question/:quizId/:questionId
@method DELETE
@access Private
@responses
    401: Unauthorized -> {message: "Unauthorized"}
    200: Ok -> {message: "question deleted successfully"}
    500: Server error -> {message: "something wrong try again later"}
*/
router.delete('/delete-question/:quizId/:questionId', isAuthenticated, deleteQuestion)

/**
@desc user can see their  notification
@route api/v1/user/notifications
@method GET
@access Private
@responses

*/
router.get('/notifications', isAuthenticated, getNotification)

/**
@desc when useer see notifications is cleared from db
@route api/v1/user/notifications/:id
@method DELETE
@access Private
@responses

*/
router.delete('/notifications/:id', isAuthenticated, clearNotification)


/**
@desc statistique of user
@route api/v1/user/statistique
@method GET
@access Private
@responses

*/
router.get('/statistique', isAuthenticated, getStatistique);

/**
@desc statistique of user
@route api/v1/user/quiz-info/:quizId
@method GET
@access Private
@responses

*/
router.get('/quiz-info/:quizId', isAuthenticated, getQuizAndQuestions);


/**
@desc ceate score
@route api/v1/user/create-score
@method POST
@access Private
@responses

*/
router.post('/create-score/:quizId', isAuthenticated, createScore);


export default router;