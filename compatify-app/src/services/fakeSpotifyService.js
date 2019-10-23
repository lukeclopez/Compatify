import fakeResponse from "./fakeResponse";

export const createProfile = async (userId, url) => {
  const args = {
    userId,
    url
  };

  await sleep(2000);

  console.log("fakeGenerateProfile:");
  console.log(args);

  return fakeResponse;
};

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default {
  createProfile
};
