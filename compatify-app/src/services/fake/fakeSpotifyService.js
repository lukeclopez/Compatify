import { profiles } from "./fake responses/profile";
import { spotifyUsers } from "./fake responses/spotifyUser";

export async function getProfile(userId) {
  const profile = profiles.chatoyance77;
  const spotifyUser = spotifyUsers.chatoyance77;
  const { user_id, share_url } = spotifyUser.data;

  const data = { user_id, share_url, ...profile.data };

  return data;
}

export default {
  getProfile
};
