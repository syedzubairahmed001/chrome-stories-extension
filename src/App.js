import React from "react";

import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header.component";
import Auth from "./containers/Auth/Auth.container";
import Home from "./containers/Home/Home.container";
import CreateStory from "./containers/CreateStory/CreateStory.container";
import pages from "./constants/pages";
import firebase from "./services/firebase";
import Loader from "./components/Loader/Loader.compoent";

import { UserContext } from "./context/userContext";
import { GlobalContext, GlobalContextProvider } from "./context/globalContext";
function App() {
  React.useEffect(() => {
    const user = firebase.auth().currentUser;
    console.log(user);
  }, []);
  const { globalContext } = React.useContext(GlobalContext);
  const renderPage = () => {
    const currentPage = globalContext.currentPage;
    console.log(globalContext.currentPage);
    switch (currentPage) {
      case pages.Home:
        return <Home />;
      case pages.Auth:
        return (
          <div className="flex-center h-100">
            <Auth />
          </div>
        );
      case pages.CreateStory:
        return <CreateStory />;
      default:
        return <Home />;
    }
  };
  return (
    <div className="App">
      <Header />
      {globalContext.loading && <Loader />}
      <main>{renderPage()}</main>
    </div>
  );
}

export default App;
