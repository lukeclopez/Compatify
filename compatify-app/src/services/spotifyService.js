import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl;
const authUrlKey = "authUrl";
const userIdKey = "userId";

export async function authorizeSpotifyAccountAccess(userId) {
  const response = await http.get(apiUrl + `/auth/?user_id=${userId}`);
  const authUrl = response.data.auth_url;

  localStorage.setItem(authUrlKey, authUrl);
  localStorage.setItem(userIdKey, userId);

  return authUrl;
}

export function createProfile(userId, authUrl) {
  return http.get(
    apiUrl + `/generate_profile/?user_id=${userId}&url=${authUrl}`
  );
}

export function getAuthUrl() {
  return localStorage.getItem(authUrlKey);
}

export function getUserId() {
  return localStorage.getItem(userIdKey);
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
  authorizeSpotifyAccountAccess,
  createProfile,
  getUserId,
  getAuthUrl
};
