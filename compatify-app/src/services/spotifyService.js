import http from "./httpService";
import { apiUrl } from "../config.json";

const authUrlKey = "authUrl";
const userIdKey = "spotifyUserId";
const spotifyCodeUrlKey = "spotifyCodeUrl";
const refreshTokenKey = "refreshToken";

export async function authorizeSpotifyAccountAccess() {
  const response = await http.get(apiUrl + "/auth");
  const authUrl = response.data.auth_url;

  return authUrl;
}

export function saveSpotifyUserId(UserId) {
  localStorage.setItem(userIdKey, UserId);
}

export function getSpotifyUserId() {
  return localStorage.getItem(userIdKey);
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

export function getSharedProfile(code) {
  return http.get(apiUrl + `/get_shared_profile/?code=${code}`);
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

export async function getCurrentSpotifyUser(refreshToken) {
  if (!refreshToken) return null;

  const payload = `refresh_token=${refreshToken}`;
  const currentUser = await http.post(apiUrl + "/get_current_user/", payload);
  console.log(currentUser);
  saveSpotifyUserId(currentUser.data.id);

  return currentUser;
}

export function getShareUrl(userId) {
  return http.get(apiUrl + `/get_share_url/?user_id=${userId}`);
}

export async function getNewShareUrl() {
  const refreshToken = getRefreshToken();
  const { data } = await getCurrentSpotifyUser(refreshToken);
  console.log(data);
  const newShareUrl = http.get(
    apiUrl + "/new_share_url/" + `?user_id=${data.id}`
  );
  return newShareUrl;
}

export default {
  authorizeSpotifyAccountAccess,
  getCurrentSpotifyUser,
  removeRefreshToken,
  saveSpotifyUserId,
  getSpotifyUserId,
  saveRefreshToken,
  getSharedProfile,
  getRefreshToken,
  getNewShareUrl,
  getShareUrl,
  createProfile,
  getProfile,
  getUserId,
  getAuthUrl,
  getToken
};
