import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header.component";
import Auth from "./containers/Auth/Auth.container";
import Home from "./containers/Home/Home.container";

import {UserContext} from "./context/userContext";

function App() {
  return (
      <div className="App">
        <Header />
        <main>
          <div className="flex-center h-100">
            <Auth />
          </div>
        </main>
      </div>
  );
}

export default App;
