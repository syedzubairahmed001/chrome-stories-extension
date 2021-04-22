import React from "react";
import { UserContext } from "../../context/userContext";
import { GlobalContext } from "../../context/globalContext";
import pages from "../../constants/pages";
import axios from "../../services/axios";
import { getAccessToken } from "../../helpers/auth";

import ProfileComponent from "../../components/Profile/Profile.component";
import styles from "./Profile.module.css";

const Profile = (props) => {
  const { userContext, setUserContext, resetUserContext } = React.useContext(
    UserContext
  );
  const { globalContext, setGlobalContext } = React.useContext(GlobalContext);
  const [isEditMode, setEditMode] = React.useState(false);
  const userProfilePicture = userContext.user.profilePicture;
  const userBio = userContext.user.bio;
  const userName = userContext.user.name;
  const userInstagramHandle = userContext.user.instagramHandle;
  const userTwitterHandle = userContext.user.twitterHandle;
  console.log({user: userContext.user})

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handlePostEditClick = async (data) => {
    setGlobalContext((prev) => ({ ...prev, loading: true }));
    const accessToken = await getAccessToken();
    axios
      .post(
        "/editProfile",
        {
          ...data,
        },
        { headers: { Authorization: accessToken } }
      )
      .then((res) => {
        setGlobalContext((prev) => ({
          ...prev,
          currentPage: pages.Home,
          loading: false,
        }));

        setUserContext((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            bio: data.bio || "",
            twitterHandle: data.twitterHandle || "",
            instagramHandle: data.instagramHandle || "",

          },
        }));
        localStorage.setItem(
          "user",
          JSON.stringify({
            bio: data.bio || "",
            twitterHandle: data.twitterHandle || "",
            instagramHandle: data.instagramHandle || "",
          })
        );
      })
      .catch((err) => {
        setGlobalContext((prev) => ({ ...prev, loading: false }));
      });
    console.log({ data });
  };

  return (
    <div className={styles.container}>
      <div className="text-left">
        <button
          className={`btn-tertiary closeBtn click-effect`}
          onClick={() =>
            setGlobalContext((prev) => ({ ...prev, currentPage: pages.Home }))
          }
        >
          <div className={`btn-tertiary close close-dark`}></div>
        </button>
      </div>
      <ProfileComponent
        isEdit={isEditMode}
        name={userName}
        bio={userBio}
        showEditBtn={!isEditMode}
        onEditClick={handleEditClick}
        photoUrl={userProfilePicture}
        onPostEditClick={handlePostEditClick}
        twitterHandle={userTwitterHandle}
        instagramHandle={userInstagramHandle}
      />
    </div>
  );
};

export default Profile;
