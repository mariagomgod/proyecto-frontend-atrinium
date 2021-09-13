import 'react-notifications/lib/notifications.css';

import { createContext } from "react";
import Router from "./components/Router";
import './App.sass';

export const GlobalContext = createContext({});

function App() {

  const logOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="container-fluid">
      <GlobalContext.Provider value={{ logOut }}>
        <Router />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
