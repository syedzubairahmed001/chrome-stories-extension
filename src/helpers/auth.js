import axios from "axios";

export const getAccessToken = async () => {
  try {
    let accessExp = localStorage.getItem("id-exp");
    let accessToken = localStorage.getItem("id-token");
    let refreshToken = localStorage.getItem("r");
    let apiKey = localStorage.getItem("ak");
    accessExp = Date(Number(accessExp));
    if (accessExp > new Date()) {
      return accessToken;
    } else {
      const accessTokenRes = await axios.post(
        `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
        {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }
      );
      localStorage.setItem("id-token", accessTokenRes.data.id_token);
      localStorage.setItem("r", accessTokenRes.data.refresh_token);
      const expTime =
        new Date().getMilliseconds + Number(accessTokenRes.data.expires_in);
      localStorage.setItem("id-exp", expTime);
      return accessTokenRes.data.id_token;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
