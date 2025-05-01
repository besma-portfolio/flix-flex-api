import { jwt } from '../helpers';

function verifyToken(req, res, next) {
  const token = req.headers.authorization

  if (!token) {
    res.status(401).json({
      message: "No token provided."
    })
    return
  }


  const data = jwt.verifyToken(token)
  if (!data) {
    return res.status(401).json({
      message: "Failed to authenticate token."
    })
  }

  req.param.userId = data.id
  next()
}


export default verifyToken;
