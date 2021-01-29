import React from "react";

export const UserContext = React.createContext();

export const UserContextProvider = (props) => {
  const [userContext, setUserContext] = React.useState({
    user: {
      name: null,
      email: null,
      profilePicture: null,
    },
    isAuthenticated: false,
  });
  const resetUserContext = () => {
    setUserContext({
      user: {
        name: null,
        email: null,
        profilePicture: null,
      },
      isAuthenticated: false,
    });
  };
  return (
    <UserContext.Provider value={{ userContext, setUserContext, resetUserContext }}>
      {props.children}
    </UserContext.Provider>
  );
};
