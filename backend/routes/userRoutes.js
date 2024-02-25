import { Router } from "express";
import { postUserLogin, postUserSignup } from "../controllers/userControllers.js";
import { validationLogin, validationSignUp } from "../utils/validation.js";
const router = Router();

// POST -> /api/v1/user/signup
router.post('/signup',validationSignUp, postUserSignup);

// POST -> /api/v1/user/login
router.post('/login', validationLogin,postUserLogin);

export default router;