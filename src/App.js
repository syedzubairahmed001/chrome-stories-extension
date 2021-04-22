import React from "react";

import logo from "./logo.svg";


import "./App.css";
import "./css/colors.css"
import "./css/typography.css"
import "./css/layout.css"
import "./css/buttons.css"
import "./css/animations.css"
import "./css/inputs.css"

import Header from "./components/Header/Header.component";
import Auth from "./containers/Auth/Auth.container";
import Home from "./containers/Home/Home.container";
import About from "./containers/About/About.container";
import Profile from "./containers/Profile/Profile.container";
import CreateStory from "./containers/CreateStory/CreateStory.container";
import ViewStory from "./containers/ViewStory/ViewStory.container";
import pages from "./constants/pages";
import firebase from "./services/firebase";
import Loader from "./components/Loader/Loader.compoent";
import SetUser from "./components/SetUser/SetUser.component";

import { UserContext } from "./context/userContext";
import { GlobalContext, GlobalContextProvider } from "./context/globalContext";
function App() {
  React.useEffect(() => {
    const user = firebase.auth().currentUser;
  }, []);
  const { globalContext } = React.useContext(GlobalContext);
  const renderPage = () => {
    const currentPage = globalContext.currentPage;
    switch (currentPage) {
      case pages.Home:
        return <Home />;
      case pages.Auth:
        return <Auth />;
      case pages.About:
        return <About />;
      case pages.CreateStory:
        return <CreateStory />;
      case pages.ViewStory:
        return <ViewStory />;
      case pages.Profile:
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <SetUser />
      {/* <Header /> */}
      {globalContext.currentPage === pages.ViewStory ? "" : <Header />}
      {globalContext.loading && <Loader />}
      <main>{renderPage()}</main>
    </div>
  );
}

export default App;


