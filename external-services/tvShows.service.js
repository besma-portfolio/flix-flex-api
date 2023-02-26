import config from '../config/config';
import fetch from 'node-fetch';

const { url, apiKey } = config.themoviedb;

const getPopularTvShows = async (page) => {
  let response;
  try {
    response = await fetch(`${url}/tv/popular?api_key=${apiKey}&page=${page}`, {
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

const getTopRatedTvShows = async (page) => {
  let response;
  try {
    response = await fetch(`${url}/tv/top_rated?api_key=${apiKey}&page=${page}`, {
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

const getTvShowDetails = async (id) => {
  let response;
  try {
    response = await fetch(`${url}/tv/${id}?api_key=${apiKey}&append_to_response=videos`, {
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

const searchTvShows = async ({ query, page }) => {

  let response;
  try {
    response = await fetch(`${url}/search/tv?query=${query}&page=${page}&api_key=${apiKey}`, {
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
  getPopularTvShows,
  getTvShowDetails,
  getTopRatedTvShows,
  searchTvShows,
}