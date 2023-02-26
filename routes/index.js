import userRouter from './user.router';
import moviesRouter from './movies.router';
import tvShowsRouter from './tvShows.router';
import favoriteRouter from './favorite.router';
import { verifyToken } from "../middlewares";

const BASE_URL = "/api"

export default function (app) {
  // define routes
  app.use(`${BASE_URL}/user`, userRouter)
  app.use(`${BASE_URL}/favorite`, verifyToken, favoriteRouter)
  app.use(`${BASE_URL}/movies`, moviesRouter)
  app.use(`${BASE_URL}/tv-shows`, tvShowsRouter)
}