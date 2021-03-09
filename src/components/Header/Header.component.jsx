import React from "react";

import { UserContext } from "../../context/userContext";
import { GlobalContext } from "../../context/globalContext";
import logo from "../../images/logos/logo_100x100.png";
import styles from "./Header.module.css";
import pages from "../../constants/pages";

const Header = (props) => {
  const { userContext, setUserContext, resetUserContext } = React.useContext(
    UserContext
  );
  const [menuActive, setMenuActive] = React.useState(false);
  const { globalContext, setGlobalContext } = React.useContext(GlobalContext);
  React.useEffect(() => {
    setMenuActive(false);
  }, []);

  const onLoginClick = () => {
    setGlobalContext((prev) => ({ ...prev, currentPage: pages.Auth }));
  };
  const handleMenuOpen = () => {
    setMenuActive((prev) => !prev);
    // setGlobalContext((prev) => ({ ...prev, currentPage: pages.CreateStory }));
  };
  const logout = () => {
    setGlobalContext((prev) => ({ ...prev, currentPage: pages.HOME }));
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser && localUser.story) {
      const storiesToSave = {
        _fieldsProto: {
          email: {
            stringValue: localUser.email,
          },
          name: {
            stringValue: localUser.name,
          },
          photoUrl: {
            stringValue: localUser.profilePicture,
          },
          story: {
            stringValue: localUser.story,
          },
        },
      };
      setGlobalContext((prev) => ({
        ...prev,
        stories: [...prev.stories, storiesToSave],
      }));
    }
    localStorage.removeItem("user");
    localStorage.removeItem("id-token");
    localStorage.removeItem("r");
    localStorage.removeItem("id-exp");
    resetUserContext();
  };
  const userProfilePicture = userContext.user.profilePicture;
  return (
    <header className={`flex flex-space-between flex-center ${styles.header}`}>
      <div className={`flex flex-center  pl-5`}>
        <img src={logo} alt="logo" className={`${styles.logo}`} />
        <div className={`ml-5`}>
          <h3 className={`${styles.heading} text-secondary `}>Stories</h3>
          {/* <p className="text-small">
            Create by <a href="https://twitter.com/_syed_zubair">Zubair</a>
          </p> */}
        </div>
      </div>
      <div className="pr-5">
        <div className={` menu-wrapper`}>
          <ul className={` ${menuActive ? "active" : ""} menu-list`}>
            {userProfilePicture && (
              <li
                onClick={() => {
                  setMenuActive((prev) => !prev);
                  setGlobalContext((prev) => ({
                    ...prev,
                    currentPage: pages.CreateStory,
                  }));
                }}
              >
                My Story
              </li>
            )}
            <li
              onClick={() => {
                setMenuActive((prev) => !prev);
                setGlobalContext((prev) => ({
                  ...prev,
                  currentPage: pages.About,
                }));
              }}
            >
              About
            </li>
            {userProfilePicture && <li onClick={logout}>Logout</li>}
          </ul>
          {userProfilePicture ? (
            <img
              className={`${styles.profilePicture}`}
              src={userProfilePicture}
              alt="profile"
              onClick={handleMenuOpen}
            />
          ) : (
            <div className={`flex align-center`}>
              <div className={`btn-tertiary mr-5`} onClick={onLoginClick}>
                Login
              </div>
              <span className={styles.menuIcon} onClick={handleMenuOpen}>
                &#8942;
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
