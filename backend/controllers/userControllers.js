import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from "../models/user.js";
import { validationResult } from "express-validator";


// /api/v1/user/signup
async function postUserSignup(req, res){
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.status(400).json({errors: result.array()});
  }

  const {email, username, fullname, avatar, password} = req.body
  try {
    await User.create({
      email, username, fullname, avatar, password
    })
  } catch(err) {
    if(err.code === 11000) {
      const key = Object.keys(err.keyValue)[0]
      return res.status(400).json({errors: [{ path: key, value: err.keyValue[key], msg: key + " already in use" }]})
    }
    return res.status(500).json({errors: 'An error occured try again later'})
  }

  res.status(200).json({message: 'user created successfully'})
}

// /api/v1/user/login
async function postUserLogin(req, res) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({errors: result.array()})
  }
  const {email, password: passwordText} = req.body;

  const user = await User.findOne({email});

  if (!user) {
    return res.status(401).json({errors: [{msg: "Incorrect Email or Password"}]})
  }

  const validPassword = await bcrypt.compare(passwordText, user.password)
  if (!validPassword) {
    return res.status(401).json({errors: [{msg: "Incorrect Email or Password"}]})
  }
  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
  const {password, ...rest} = user._doc
  console.log(rest)
  res.status(200).json({message: "login success", data: {user: rest, token: token }})
}


export {postUserSignup, postUserLogin};