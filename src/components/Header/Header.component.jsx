import React from "react";

import { UserContext } from "../../context/userContext";
import { GlobalContext } from "../../context/globalContext";
import logo from "../../images/logos/logo_100x100.png";
import styles from "./Header.module.css";
import pages from "../../constants/pages";

const Header = (props) => {
  const { userContext, setUserContext } = React.useContext(UserContext);
  const { globalContext, setGlobalContext } = React.useContext(GlobalContext);

  const onLoginClick = () => {
    console.log({ globalContext });
    setGlobalContext((prev) => ({ ...prev, currentPage: pages.Auth }));
  };
  const onProfileClick = () => {
    console.log({ globalContext });
    setGlobalContext((prev) => ({ ...prev, currentPage: pages.CreateStory }));
  };
  const userProfilePicture = userContext.user.profilePicture;
  return (
    <header className={`flex flex-space-between flex-center ${styles.header}`}>
      <div className={`flex flex-center `}>
        <img src={logo} alt="logo" className={`${styles.logo}`} />
        <div className={`ml-5`}>
          <h3 className={`${styles.heading} text-secondary `}>Stories</h3>
          {/* <p className="text-small">
            Create by <a href="https://twitter.com/_syed_zubair">Zubair</a>
          </p> */}
        </div>
      </div>
      <div>
        {userProfilePicture ? (
          <img
            className={`${styles.profilePicture}`}
            src={userProfilePicture}
            alt="profile"
            onClick={onProfileClick}
          />
        ) : (
          <div className={`btn-tertiary`} onClick={onLoginClick}>
            Login
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
