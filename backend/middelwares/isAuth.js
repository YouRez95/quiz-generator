import jwt from 'jsonwebtoken';

const { JsonWebTokenError } = jwt;

export default async function isAuthenticated(req, res, next) {
  const authHeader = req.get('Authorization');

  try {
  if (!authHeader) {
    const error = new Error();
    error.statusCode = 401;
    error.message = "Token Not Found"
    throw error;
  }
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      const error = new Error();
      error.statusCode = 401;
      error.message = "Token Not Verified";
      throw error;
    }

    req.userId = decodedToken.id;
    return next()
  } catch(err) {
    if(err instanceof JsonWebTokenError) {
      err.statusCode = 401
      err.message = "Invalid Token"
    }
    return res.status(err.statusCode || 500).json({message: err.message || "Something went wrong try again later.."})
  }
}