import React from "react";
import { UserContext } from "../../context/userContext";
import { GlobalContext } from "../../context/globalContext";

import twitterLogo from "../../images/twitter-logo.png";
import instagramLogo from "../../images/instagram-logo.png";

import styles from "./Profile.module.css";

const Profile = (props) => {
  const [form, setForm] = React.useState({
    bio: {
      value: "",
      max: 150,
    },
    twitterHandle: {
      value: "",
      max: 15,
    },
    instagramHandle: {
      value: "",
      max: 30,
    },
  });
  React.useEffect(() => {
    setForm((prev) => ({
      ...prev,

      bio: {
        ...prev.bio,
        value: props.bio,
      },
      twitterHandle: {
        ...prev.twitterHandle,
        value: props.twitterHandle,
      },
      instagramHandle: {
        ...prev.instagramHandle,
        value: props.instagramHandle,
      },
    }));
  }, []);

  const {
    name,
    bio,
    photoUrl,
    isEdit,
    showEditBtn,
    twitterHandle,
    instagramHandle,
    onEditClick,
    onPostEditClick,
  } = props || {};

  const updateForm = (e) => {
    const newForm = { ...form };
    if (newForm[e.target.name].max > e.target.value.length) {
      newForm[e.target.name].value = e.target.value;
      setForm(newForm);
    }
  };
  const handlePostEditClick = () => {
    onPostEditClick({
      bio: form.bio.value,
      instagramHandle: form.instagramHandle.value,
      twitterHandle: form.twitterHandle.value,
    });
  };

  return (
    <div className={styles.container}>
      <div></div>
      <img
        className={`${styles.profilePicture} animate--slide-up`}
        src={photoUrl}
        alt="profile"
      />
      <h4
        className={`${styles.title} text-primary animate--slide-up a-delay-1`}
      >
        {name}
      </h4>

      {!isEdit && (
        <>
          <p
            className={`${styles.bio} text-secondary animate--slide-up a-delay-2 mt-5`}
          >
            {bio}
          </p>

          <div className={`mt-10 mb-10 animate--slide-up a-delay-3`}>
            {twitterHandle && (
              <a href={`https://twitter.com/${twitterHandle}`}>
                <img
                  src={twitterLogo}
                  alt="twitter"
                  className={styles.socialLogo}
                />
              </a>
            )}
            {instagramHandle && (
              <a href={`https://instagram.com/${instagramHandle}`}>
                <img
                  src={instagramLogo}
                  alt="instagram"
                  className={styles.socialLogo}
                />
              </a>
            )}
          </div>
        </>
      )}
      {isEdit && (
        <>
          <textarea
            name="bio"
            onChange={updateForm}
            value={form.bio.value}
            className={`${styles.bioInput} animate--slide-up mt-5`}
            placeholder="Your bio..."
          ></textarea>
          <div className={`flex  animate--slide-up a-delay-1 flex-center mt-5`}>
            <img
              src={twitterLogo}
              alt="twitter"
              className={styles.socialLogo}
            />
            <input
              onChange={updateForm}
              name="twitterHandle"
              className={`input-1`}
              placeholder="Twitter Username"
              value={form.twitterHandle.value}
            />
          </div>
          <div className={`flex  animate--slide-up a-delay-2 flex-center mt-5`}>
            <img
              src={instagramLogo}
              alt="instagram"
              className={styles.socialLogo}
            />
            <input
              onChange={updateForm}
              className={`input-1`}
              placeholder="Instagram Username"
              name="instagramHandle"
              value={form.instagramHandle.value}
            />
          </div>

          <div className={`animate--slide-up a-delay-3 mt-10`}>
            <button className={`btn-secondary  click-effect`} onClick={handlePostEditClick}>
              Submit
            </button>
          </div>
        </>
      )}
      {showEditBtn && (
        <>
          <div className={` animate--slide-up a-delay-3`}>
            <button
              className={`click-effect btn-tertiary`}
              onClick={onEditClick}
            >
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
