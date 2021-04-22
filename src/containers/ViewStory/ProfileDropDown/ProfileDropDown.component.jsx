import React from "react";

import styles from "./ProfileDropDown.module.css";
import ProfileView from "../../../components/Profile/Profile.component";
import Arrow from "../../../components/Arrow/Arrow.component";

const ProfileDropDown = (props) => {
  return (
    <div className={`${styles.container} animate--slide-down`}>
      <div className={`${styles.wrapper}`}>
        <ProfileView {...props.data} />
        <div className={`flex flex-center ${styles.arrow} `}>
          <div
            onClick={props.onCloseClick}
            className="cursor-pointer click-effect"
          >
            <Arrow />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropDown;
