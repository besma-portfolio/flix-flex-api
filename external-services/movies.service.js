import config from '../config/config';
import fetch from 'node-fetch';

const { url, apiKey } = config.themoviedb;

const getPopularMovies = async (page) => {
  let response;
  try {
    response = await fetch(`${url}/movie/popular?api_key=${apiKey}&page=${page}`, {
      method: "GET",
    })
  } catch (error) {
    console.log(error);
    throw { code: 500, error: 'internal_error' };
  }
  if (response.status === 200) {
    response = await response.json();
    return response;
  } else {
    const error = await response.json();
    console.log(error)
    throw { code: response.status ?? 500, error: error.errors?.[0] ?? 'internal_error' };
  }
}

const getUpcomingMovies = async (page) => {
  let response;
  try {
    response = await fetch(`${url}/movie/upcoming?api_key=${apiKey}&page=${page}`, {
      method: "GET",
    })
  } catch (error) {
    console.log(error);
    throw { code: 500, error: 'internal_error' };
  }
  if (response.status === 200) {
    response = await response.json();
    return response;
  } else {
    const error = await response.json();
    console.log(error)
    throw { code: response.status ?? 500, error: error.errors?.[0] ?? 'internal_error' };
  }
}

const getMovieDetails = async (id) => {
  let response;
  try {
    response = await fetch(`${url}/movie/${id}?api_key=${apiKey}&append_to_response=videos`, {
      method: "GET",
    })
  } catch (error) {
    console.log(error);
    throw { code: 500, error: 'internal_error' };
  }
  if (response.status === 200) {
    response = await response.json();
    return response;
  } else {
    const error = await response.json();
    console.log(error)
    throw { code: response.status ?? 500, error: error.errors?.[0] ?? 'internal_error' };
  }
}

const searchMovies = async ({ query, page }) => {

  let response;
  try {
    response = await fetch(`${url}/search/movie?query=${query}&page=${page}&api_key=${apiKey}`, {
      method: "GET",
    })
  } catch (error) {
    console.log(error);
    throw { code: 500, error: 'internal_error' };
  }
  if (response.status === 200) {
    response = await response.json();
    return response;
  } else {
    const error = await response.json();
    console.log(error)
    throw { code: response.status ?? 500, error: error.errors?.[0] ?? 'internal_error' };
  }
}
export default {
  getPopularMovies,
  getMovieDetails,
  getUpcomingMovies,
  searchMovies,
}