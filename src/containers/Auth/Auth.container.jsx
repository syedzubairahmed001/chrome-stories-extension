import React from "react";

import styles from "./Auth.module.css";
import logo from "../../images/logos/logo_100x100.png";
import GoogleSigninBtn from "../../components/GoogleSigninBtn/GoogleSigninBtn.component";
import { GlobalContext } from "../../context/globalContext";
import pages from "../../constants/pages";

const Auth = (props) => {
  const { globalContext, setGlobalContext } = React.useContext(GlobalContext);

  return (
    <div className="flex flex-column h-100">
      <div className="p-10">
        <button
          className={`btn-tertiary closeBtn click-effect`}
          onClick={() =>
            setGlobalContext((prev) => ({ ...prev, currentPage: pages.Home }))
          }
        >
          <div className={`btn-tertiary close close-dark`}></div>
        </button>
      </div>
      <div className="flex-1 mt-10 flex-column">
        <div className={`text-center mb-5`}>
          <img src={logo} alt="logo" className={`${styles.logo} animate--slide-up`} />
          <h2 className={`text-primary font-big animate--slide-up a-delay-1 `}>Stories in Browser!</h2>
        </div>
        <div className={`text-center`}>
          <p className={`text-secondary font-small animate--slide-up a-delay-2`}>
            Share and watch stories from people around the world while you
            browse!
          </p>
        </div>
        <div className={`flex-center animate--slide-up a-delay-3 `}>
          <GoogleSigninBtn />
        </div>
      </div>
    </div>
  );
};

export default Auth;
