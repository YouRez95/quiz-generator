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

  try {
    await User.create(req.body)
  } catch(err) {
    if(err.code === 11000) {
      const key = Object.keys(err.keyValue)[0]
      return res.status(400).json({errors: [{ path: key, value: err.keyValue[key], msg: "already in use" }]})
    }
    return res.status(500).json({message: 'An error occured try again later'})
  }

  res.status(200).json({message: 'user created successfully'})
}

// /api/v1/user/login
async function postUserLogin(req, res) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({errors: result.array()})
  }
  const {email, password} = req.body;

  const user = await User.findOne({email});

  if (!user) {
    return res.status(401).json({message: "Incorrect email or Password"})
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    return res.status(401).json({message: "Incorrect email or Password"})
  }
  const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);

  res.status(200).json({message: "login success", token, data: {email: user.email, username: user.username }})
}


export {postUserSignup, postUserLogin};