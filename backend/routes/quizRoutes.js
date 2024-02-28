import {Router} from 'express'
import { createQuestion, createQuiz, getAllQuizzes, getSingleQuiz } from '../controllers/quizControllers.js';
import isAuthenticated from '../middelwares/isAuth.js';

const router = Router()

// POST -> /api/v1/quiz/create
router.post('/create',isAuthenticated, createQuiz);

// POST -> /api/v1/quiz/:id
router.post('/:id',isAuthenticated, createQuestion);

/* 
@desc description
@route GET -> /api/v1/quiz/:id
@access Public
@responses
    201: description: Created
    409: description: Conflict
    404: description: Not Found
    500: desccription: Server Error
*/
router.get('/:id', getSingleQuiz);


// GET -> /api/v1/quiz/all-quizzes
router.get('/all-quizzes', getAllQuizzes);


/* 
@desc update quiz
@route GET -> /api/v1/quiz/:id
@access Public
@responses
    201: description: Created
    409: description: Conflict
    404: description: Not Found
    500: desccription: Server Error
*/

/* 
@desc update question
@route GET -> /api/v1/quiz/:id
@access Public
@responses
    201: description: Created
    409: description: Conflict
    404: description: Not Found
    500: desccription: Server Error
*/

/* 
@desc delete quiz
@route GET -> /api/v1/quiz/:id
@access Public
@responses
    201: description: Created
    409: description: Conflict
    404: description: Not Found
    500: desccription: Server Error
*/

/* 
@desc delete question
@route GET -> /api/v1/quiz/:id
@access Public
@responses
    201: description: Created
    409: description: Conflict
    404: description: Not Found
    500: desccription: Server Error
*/

/* 
@desc like quiz
@route GET -> /api/v1/quiz/:id
@access Public
@responses
    201: description: Created
    409: description: Conflict
    404: description: Not Found
    500: desccription: Server Error
*/

/* 
@desc comment quiz
@route GET -> /api/v1/quiz/:id
@access Public
@responses
    201: description: Created
    409: description: Conflict
    404: description: Not Found
    500: desccription: Server Error
*/

export default router