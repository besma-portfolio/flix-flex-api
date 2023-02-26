import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../models';
import config from '../config/config';

function _createNewUser(params) {
  const { password, ...user } = params;
  if (password) {
    user.hash = bcrypt.hashSync(password, 10);
  }
  return user;
}

function register(_user) {
  const newUser = new db.User(_createNewUser(_user));
  return newUser.save().then((user) => {

    const token = jwt.sign({ id: user._id }, config.jwtSecret);
    return {
      token,
    };
  }).catch((err) => {
    console.log(err);
    throw { code: 500, error: 'internal_error' };
  });
}

async function login({ username, password }) {
  const user = await db.User.findOne({ username }).exec()
    .catch(() => { throw { code: (500), errors: 'internal_error' }; });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ id: user._id }, config.jwtSecret);
    return {
      token,
    };
  } throw { code: 403, error: 'incorrect_credentials' };
}

async function getUserById(id) {
  const user = await db.User.findById(id).exec()
    .catch((err) => {
      console.log(err);
      throw { code: (500), error: 'internal_error' };
    });
  return user._doc;
}

export default {
  register,
  login,
  getUserById,
};
