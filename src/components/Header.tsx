// import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogInButton, SignUpButton, LogOutButton } from './SignInOut';
import { useAuth } from '../context/AuthContext';


export const Header = () => {
    const { user } = useAuth();
    const location = useLocation();

    return (
        <>
        <header>
            <div className='header-container-logo'>
                <img src="/MCPLogo.png" alt="MCP Logo" />
                <h1>MCP Cornerstone</h1>
            </div>
            <div className='header-container-nav'>
                    <Link 
                        style={{
                            color: location.pathname =='/Home' ? 'var(--light-blue)' : 'white',
                        }} 
                        to={'/Home'}
                    >
                        Home
                    </Link>
                    <Link 
                        style={{
                            color: location.pathname == '/Dashboard' ? 'var(--light-blue)' : 'white',
                        }} 
                        to={'/Dashboard'}
                    >
                        Dashboard
                    </Link>
            </div>
            <div className='header-container-sign'>
            <p>
              { user ? user.displayName : "Guest"}</p>
              { user ? <LogOutButton  /> : <SignUpButton  />}
              { user ? null : <LogInButton />}
            </div>
        </header>
        </>
    )
}