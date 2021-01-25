import React from "react";

import google_logo from "../../images/google_logo.png";
import styles from "./GoogleSigninBtn.module.css";
import { signInWithGoogle, auth } from "../../services/firebase";
import { UserContext } from "../../context/userContext";
import { GlobalContext } from "../../context/globalContext";
import pages from "../../constants/pages";

const GoogleSigninBtn = (props) => {
  const { userContext, setUserContext } = React.useContext(UserContext);
  const { globalContext, setGlobalContext } = React.useContext(GlobalContext);
  const onSigninClick = () => {
    setGlobalContext((prev) => ({ ...prev, loading: true }));
    signInWithGoogle()
      .then((res) => {
        setGlobalContext((prev) => ({
          ...prev,
          loading: false,
          currentPage: pages.Home,
        }));
        console.log(res);
        auth.currentUser
          .getIdToken()
          .then((idToken) => {
            console.log(idToken);
            localStorage.setItem("id-token", idToken);
          })
          .catch((idTokenErr) => {
            console.log(idTokenErr);
          });
        if (res.user) {
          localStorage.setItem(
            "user",
            JSON.stringify(JSON.parse(JSON.stringify(res.user)))
          );
          console.log(JSON.parse(localStorage.getItem("user")));
          setUserContext((prev) => ({
            ...prev,
            user: {
              ...prev.user,
              name: res.user.displayName,
              email: res.user.email,
              profilePicture: res.user.photoURL,
            },
          }));
        }
      })
      .catch((err) => {
        setGlobalContext((prev) => ({ ...prev, loading: true }));
        console.log(err);
      });
  };
  return (
    <div {...props} className={`${styles.button}`} onClick={onSigninClick}>
      <img className={`${styles.logo}`} src={google_logo} alt="google signin" />
      <p className={`${styles.text}`}>Sign in with Google</p>
    </div>
  );
};

export default GoogleSigninBtn;
