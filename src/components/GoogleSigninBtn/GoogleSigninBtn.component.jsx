import React from "react";

import google_logo from "../../images/google_logo.png";
import styles from "./GoogleSigninBtn.module.css";
import { signInWithGoogle, auth } from "../../services/firebase";
import { UserContext } from "../../context/userContext";
import { GlobalContext } from "../../context/globalContext";
import pages from "../../constants/pages";
import axios from "../../services/axios";

const GoogleSigninBtn = (props) => {
  const { userContext, setUserContext } = React.useContext(UserContext);
  const { globalContext, setGlobalContext } = React.useContext(GlobalContext);
  const onSigninClick = async () => {
    try {
      setGlobalContext((prev) => ({ ...prev, loading: true }));
      const googleRes = await signInWithGoogle();
      const googleResJson = JSON.parse(JSON.stringify(googleRes.user));
      console.log(googleResJson);
      const refreshToken = googleResJson.stsTokenManager.refreshToken;
      const idToken = googleResJson.stsTokenManager.accessToken;
      const apiKey = googleResJson.stsTokenManager.apiKey;
      const idExp = googleResJson.stsTokenManager.expirationTime;
      console.log(idToken);
      localStorage.setItem("id-token", idToken);
      localStorage.setItem("id-exp", idExp);
      localStorage.setItem("r", refreshToken);
      localStorage.setItem("ak", apiKey);
      let userData = await axios.get("/getUser", {
        headers: {
          Authorization: idToken,
        },
      });
      if (userData.data) {
        let userDataJson = userData.data.data._fieldsProto;
        if (!userDataJson) {
          setUserContext((prev) => ({
            ...prev,
            user: {
              ...prev.user,
              name: googleResJson.displayName,
              email: googleResJson.email,
              profilePicture: googleResJson.photoUrl,
              story: "",
            },
          }));
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: googleResJson.displayName,
              email: googleResJson.email,
              profilePicture: googleResJson.photoUrl,
              story: "",
            })
          );
        } else {
          setUserContext((prev) => ({
            ...prev,
            user: {
              ...prev.user,
              name: userDataJson.name.stringValue,
              email: userDataJson.email.stringValue,
              profilePicture: userDataJson.photoUrl.stringValue,
              story: userDataJson.story.stringValue,
            },
          }));
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: userDataJson.name.stringValue,
              email: userDataJson.email.stringValue,
              profilePicture: userDataJson.photoUrl.stringValue,
              story: userDataJson.story.stringValue,
            })
          );
        }
      }
      setGlobalContext((prev) => ({
        ...prev,
        loading: false,
        currentPage: pages.Home,
      }));
    } catch (err) {
      setGlobalContext((prev) => ({ ...prev, loading: false }));
      console.log(err);
    }
  };
  return (
    <div {...props} className={`${styles.button}`} onClick={onSigninClick}>
      <img className={`${styles.logo}`} src={google_logo} alt="google signin" />
      <p className={`${styles.text}`}>Sign in with Google</p>
    </div>
  );
};

export default GoogleSigninBtn;
