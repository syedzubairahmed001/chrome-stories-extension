import React from "react";

import { UserContext } from "../../context/userContext";

const SetUser = () => {
  const { userContext, setUserContext } = React.useContext(UserContext);
  React.useEffect(() => {
    const userExists = JSON.parse(localStorage.getItem("user"));
    if (userExists) {
      setUserContext((prev) => ({
        ...prev,
        user: {
          name: userExists.name,
          email: userExists.email,
          profilePicture: userExists.profilePicture,
          story: userExists.story,
        },
      }));
    }
  }, []);
  return <></>;
};

export default SetUser;
