import React from "react";
import pages from "../constants/pages";
import firebase from "../services/firebase";

export const GlobalContext = React.createContext();

export const GlobalContextProvider = (props) => {
  const [globalContext, setGlobalContext] = React.useState({
    currentPage: pages.Home,
    loading: false,
  });

  return (
    <GlobalContext.Provider value={{ globalContext, setGlobalContext }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
