import { userService } from '../services';

function register(req, res) {
  userService.register(req.body)
    .then((result) => res.json(result))
    .catch((err) => { console.log(err); res.status(err.code).json({ error: err.error }); });
}

function login(req, res) {
  userService.login(req.body).then((result) => {
    res.json(result);
  }).catch((err) => { console.log(err); res.status(err.code).json({ error: err.error }); });
}

function getUserInfo(req, res) {
  const { userId } = req.param
  userService.getUserById(userId).then((result) => {
    const { hash, ...user } = result;
    res.json(user);
  }).catch((err) => { console.log(err); res.status(err.code).json({ error: err.error }); });
}
export default {
  register,
  login,
  getUserInfo,
}