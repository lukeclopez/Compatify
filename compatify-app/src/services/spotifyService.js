import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl;

export function authorizeSpotifyAccountAccess(userId) {
  return http.get(apiUrl + `/auth/?user_id=${userId}`);
}

export function createProfile(userId, authUrl) {
  return http.get(
    apiUrl + `/generate_profile/?user_id=${userId}&url=${authUrl}`
  );
}

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }

  return http.post(apiEndpoint, movie);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}

export default {
  authorizeSpotifyAccountAccess
};
