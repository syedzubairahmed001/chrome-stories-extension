import React from "react";

import {UserContext} from '../../context/userContext';
import logo from "../../images/logos/chrome_stories__100x100.png";
import styles from "./Header.module.css";

const Header = (props) => {
  const user = React.useContext(UserContext);
  console.log(user)
  return (
    <header className={`flex flex-space-between flex-center ${styles.header}`}>
      <div className={`flex flex-center `}>
        <img src={logo} alt="logo" className={`${styles.logo}`} />
        <h3 className={`${styles.heading} text-secondary ml-5`}>Chrome Stories</h3>
      </div>
      <div>
        <button className={`btn-tertiary`}>
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
