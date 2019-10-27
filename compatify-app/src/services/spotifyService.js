import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl;
const authUrlKey = "authUrl";
const userIdKey = "userId";
const spotifyCodeUrlKey = "spotifyCodeUrl";
const refreshTokenKey = "refreshToken";

export async function authorizeSpotifyAccountAccess() {
  const response = await http.get(apiUrl + "/auth");
  const authUrl = response.data.auth_url;

  return authUrl;
}

export function saveSpotifyCodeUrl(codeUrl) {
  localStorage.setItem(spotifyCodeUrlKey, codeUrl);
}

export function saveRefreshToken(refreshToken) {
  localStorage.setItem(refreshTokenKey, refreshToken);
}

export function getRefreshToken() {
  return localStorage.getItem(refreshTokenKey);
}

export function removeRefreshToken() {
  return localStorage.removeItem(refreshTokenKey);
}

export function createProfile(userId, refreshToken) {
  return http.get(
    apiUrl +
      `/generate_profile/?user_id=${userId}&refresh_token=${refreshToken}`
  );
}

export function getProfile(userId) {
  return http.get(apiUrl + `/get_profile/?user_id=${userId}`);
}

export function getToken(url) {
  return http.get(apiUrl + `/auth_get_token/?url=${url}`);
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

export function getCurrentSpotifyUser(refreshToken) {
  if (!refreshToken) return null;

  return http.post(
    apiUrl + "/get_current_user/",
    `refresh_token=${refreshToken}`
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
  authorizeSpotifyAccountAccess,
  getCurrentSpotifyUser,
  removeRefreshToken,
  saveSpotifyCodeUrl,
  saveRefreshToken,
  getRefreshToken,
  getToken,
  createProfile,
  getProfile,
  getUserId,
  getAuthUrl
};
