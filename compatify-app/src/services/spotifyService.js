import http from "./httpService";
import { apiUrl } from "../config.json";
import qs from "qs";

const authUrlKey = "authUrl";
const userIdKey = "spotifyUserId";
const spotifyCodeUrlKey = "spotifyCodeUrl";
const refreshTokenKey = "refreshToken";
const shareUrlKey = "shareUrl";

export async function authorizeSpotifyAccountAccess() {
  const response = await http.get(apiUrl + "/auth");
  const authUrl = response.data.auth_url;

  return authUrl;
}

export function saveShareUrl(value) {
  localStorage.setItem(shareUrlKey, value);
}

export function getShareUrl() {
  return localStorage.getItem(shareUrlKey);
}

export function removeShareUrl() {
  return localStorage.removeItem(shareUrlKey);
}

export function saveSpotifyUserId(UserId) {
  localStorage.setItem(userIdKey, UserId);
}

export function getSpotifyUserId() {
  return localStorage.getItem(userIdKey);
}

export function removeSpotifyUserId() {
  return localStorage.removeItem(userIdKey);
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

export async function getProfile(userId) {
  const profile = await http.get(apiUrl + `/get_profile/?user_id=${userId}`);
  const spotifyUser = await getSpotifyUser(userId);
  const { user_id, share_url } = spotifyUser.data;

  const data = { user_id, share_url, ...profile.data };

  return data;
}

export function getSpotifyUser(userId) {
  return http.get(apiUrl + `/get_spotify_user/?user_id=${userId}`);
}

export async function getSpotifyUserByPk(pk) {
  const response = await http.get(apiUrl + `/get_spotify_user_by_pk/?pk=${pk}`);
  return response.data;
}

export async function getSharedProfile(shareUrl) {
  const response = await http.get(
    apiUrl + `/get_shared_profile/?code=${shareUrl}`
  );
  return response.data;
}

export function createCompatibilityReport(userId, shareUrl) {
  const data = { user_id: userId, share_url: shareUrl };
  return http.post(apiUrl + "/compatify/", qs.stringify(data));
}

export function getCompatibilityReport(pk) {
  return http.get(apiUrl + `/get_report/?pk=${pk}`);
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
  if (!refreshToken) {
    removeSpotifyUserId();
    return null;
  }

  const payload = `refresh_token=${refreshToken}`;
  const currentUser = await http.post(apiUrl + "/get_current_user/", payload);
  saveSpotifyUserId(currentUser.data.id);

  return currentUser;
}

export function getUserShareUrl(userId) {
  return http.get(apiUrl + `/get_share_url/?user_id=${userId}`);
}

export async function getNewShareUrl() {
  const refreshToken = getRefreshToken();
  const { data } = await getCurrentSpotifyUser(refreshToken);
  const newShareUrl = http.get(apiUrl + `/new_share_url/?user_id=${data.id}`);
  return newShareUrl;
}

export async function getAllReportsForUser(userId) {
  const response = await http.get(
    apiUrl + `/get_all_reports_for_user/?user_1_id=${userId}`
  );

  return response.data;
}

export default {
  authorizeSpotifyAccountAccess,
  createCompatibilityReport,
  getCompatibilityReport,
  getCurrentSpotifyUser,
  getAllReportsForUser,
  removeRefreshToken,
  getSpotifyUserByPk,
  saveSpotifyUserId,
  getSpotifyUserId,
  saveRefreshToken,
  getSharedProfile,
  getRefreshToken,
  getUserShareUrl,
  getNewShareUrl,
  removeShareUrl,
  createProfile,
  saveShareUrl,
  getShareUrl,
  getProfile,
  getAuthUrl,
  getUserId,
  getToken
};
