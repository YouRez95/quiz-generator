import bcrypt from 'bcrypt';
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user',
    required: true
  },
  avatar: {
    type: String,
    required: true
  }
}, {timestamps: true})


UserSchema.pre('save', async function(next) {
  const passwordPlaiText = this.password;
  const saltRounds = 10;
  
  try {
    const hashPassword = await bcrypt.hash(passwordPlaiText, saltRounds)
    this.password = hashPassword;
  } catch(err) {
    next(err)
  }
  next()
})

const User = model('User', UserSchema);

export default User;