import { Router } from "express";
import { postUserLogin, postUserSignup } from "../controllers/userControllers.js";
import { validationLogin, validationSignUp } from "../utils/validation.js";
const router = Router();

// POST -> /api/v1/user/signup
router.post('/signup',validationSignUp, postUserSignup);

// POST -> /api/v1/user/login
router.post('/login', validationLogin,postUserLogin);

/* 
@desc update info user
@route GET -> /api/v1/quiz/:id
@access Public
@responses
    201: description: Created
    409: description: Conflict
    404: description: Not Found
    500: desccription: Server Error
*/

/* 
@desc update password
@route GET -> /api/v1/quiz/:id
@access Public
@responses
    201: description: Created
    409: description: Conflict
    404: description: Not Found
    500: desccription: Server Error
*/

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

/* 
@desc user notification
@route GET -> /api/v1/quiz/:id
@access Public
@responses
    201: description: Created
    409: description: Conflict
    404: description: Not Found
    500: desccription: Server Error
*/

export default router;