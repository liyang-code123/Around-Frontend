import React, { useState } from 'react'
import TopBar from './TopBar';
import Main from './Main';

import { TOKEN_KEY } from "../constants";

function App() {
    // in function-based component, each state needs one useState
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem(TOKEN_KEY) ? true : false
    );
    const logout = () => {

        localStorage.removeItem(TOKEN_KEY);
        setIsLoggedIn(false);
    }
    const loggedIn = token => {
        if(token) {
            localStorage.setItem(TOKEN_KEY, token);
            setIsLoggedIn(true);
        }
    }
  return (
    <div className="App">
      <TopBar isLoggedIn={isLoggedIn}
              handleLogout={logout} />
        <Main isLoggedIn={isLoggedIn}
              handleLoggedIn={loggedIn}
        />
    </div>
  );
}

export default App;
