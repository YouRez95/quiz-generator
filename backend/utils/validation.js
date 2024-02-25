import { body } from "express-validator"
import User from "../models/user.js"

export const validationSignUp = [ body(['username', 'fullname']).trim().notEmpty().withMessage('fullname and username cannot be empty'),
body('email').isEmail().withMessage('Invalid email'),
body('email').custom(async (value) => {
  const user = await User.findOne({email: value})
  if (user) {
    throw new Error('email already in use')
  }
}),
body('password').isLength({min: 5}).withMessage('password too short')
]


export const validationLogin = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({min: 5}).withMessage('password too short')
]