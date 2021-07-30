import React, { useState } from 'react'
import TopBar from './TopBar';
import Main from './Main';

import { TOKEN_KEY } from "../constants";

function App() {
    // in function-based component, each state needs one useState
    const [isLoggedIn, setIsLoggedIn] = useState(
        !localStorage.getItem(TOKEN_KEY) ? true : false
    );
    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        setIsLoggedIn(false);
    }
  return (
    <div className="App">
      <TopBar isLoggedIn={isLoggedIn}
              handleLogout={logout}/>
        <Main />
    </div>
  );
}

export default App;
