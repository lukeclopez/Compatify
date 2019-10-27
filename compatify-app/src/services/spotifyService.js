import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl;
const authUrlKey = "authUrl";
const userIdKey = "userId";
const spotifyCodeUrlKey = "spotifyCodeUrl";

export async function authorizeSpotifyAccountAccess(userId) {
  const response = await http.get(apiUrl + `/auth/?user_id=${userId}`);
  const authUrl = response.data.auth_url;

  localStorage.setItem(authUrlKey, authUrl);
  localStorage.setItem(userIdKey, userId);

  return authUrl;
}

export function saveSpotifyCodeUrl(codeUrl) {
  localStorage.setItem(spotifyCodeUrlKey, codeUrl);
}

export function createProfile(userId, url) {
  return http.get(apiUrl + `/generate_profile/?user_id=${userId}&url=${url}`);
}

export function getProfile(userId) {
  return http.get(apiUrl + `/get_profile/?user_id=${userId}`);
}

export function parseCodeFromSearch(search) {
  const code = search.replace("?code=", "");
  return code;
}

export function getCode() {
  return localStorage.getItem(spotifyCodeUrlKey);
}

export function getAuthUrl() {
  return localStorage.getItem(authUrlKey);
}

export function getUserId() {
  return localStorage.getItem(userIdKey);
}

export function getCurrentSpotifyUser() {
  const token = getCode();
  console.log(token);
  return http.post(apiUrl + "/get_current_user/", `url=${token}`);
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
  getCurrentSpotifyUser,
  parseCodeFromSearch,
  saveSpotifyCodeUrl,
  createProfile,
  getProfile,
  getUserId,
  getAuthUrl
};
