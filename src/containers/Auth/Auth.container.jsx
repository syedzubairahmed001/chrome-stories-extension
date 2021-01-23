import React from "react";

import styles from "./Auth.module.css";
import logo from "../../images/logos/chrome_stories__100x100.png";
import GoogleSigninBtn from "../../components/GoogleSigninBtn/GoogleSigninBtn.component";

const Auth = (props) => {
  return (
    <div>
      <div className={`text-center mb-5`}>
        <img src={logo} alt="logo" className={`${styles.logo}`} />
        <h2 className={`text-primary`}>Stories for Chrome</h2>
      </div>
      <div className={`text-center`}>
        <p className={`text-secondary text-light`}>
          Share and watch stories from people around the world while you browse!
        </p>
      </div>
      <div className={`flex-center`} >
        <GoogleSigninBtn />
      </div>
    </div>
  );
};

export default Auth;
