// import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogIn, SignIn, LogOut } from './SignInOut';
import {  useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';


export const Header = () => {
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const { user } = useAuth();
    const location = useLocation();


    useEffect(() => {
        if (location.pathname === '/SignIn') {
            setIsSigningIn(true);
        } else {
            setIsSigningIn(false);
        }
        if (location.pathname === '/LogIn') {
            setIsLoggingIn(true);
        } else {
            setIsLoggingIn(false);
        }
    }, [location.pathname])

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
              { user ? <LogOut  /> : <SignIn isSigningIn={isSigningIn} />}
              { user ? null : <LogIn isLoggingIn={isLoggingIn} />}
            </div>
        </header>
        </>
    )
}