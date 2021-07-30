import React from 'react';
import logo from '../assets/images/logo.svg';
import { LogoutOutlined } from '@ant-design/icons';

// this is function-based component
function TopBar(props) {
    const {isLoggedIn, handleLogout } = props;
    return (
        <header className="App-header">
            <img
                src={logo}
                alt="logo"
                className="App-logo"
            />
            <span className="App-title">Around Web</span>
            {
                isLoggedIn ?
                    <LogoutOutlined
                        className ="logout"
                        onClick={handleLogout}
                    />
                    :
                    null
            }
        </header>
    );
}

export default TopBar;