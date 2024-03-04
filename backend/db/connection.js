import mongoose from "mongoose";
async function connectToDb (url) {
  try {
    mongoose.connect(url)
    console.log('mongoose connected')
  } catch(err) {
    console.log(err)
  }
}

export default connectToDb



