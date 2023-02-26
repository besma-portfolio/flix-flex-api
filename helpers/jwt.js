import jwt from 'jsonwebtoken';
import config from "../config/config"

const generateToken = (data, times = 1, defaultExpire = 86400) => {
  return jwt.sign(data, config.jwtSecret, {
    expiresIn: defaultExpire * times
  })
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret)
  } catch (err) {
    return null
  }
}


export default {
  generateToken,
  verifyToken,
}