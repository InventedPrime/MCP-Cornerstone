import { useNavigate } from "react-router-dom";
import { signOutUser } from "../utils/firebase";

export const SignIn = ({isSigningIn}: {isSigningIn: boolean}) => {
    const navigate = useNavigate();

    return (
        <button disabled={isSigningIn} onClick={() => navigate('/SignIn')}>Sign In</button>
    )
};

export const LogIn = ({isLoggingIn}: {isLoggingIn: boolean}) => {
    const navigate = useNavigate();
    
    return (
        <button disabled={isLoggingIn} onClick={() => navigate('/LogIn')}>Log In</button>
    )
}
    
export const LogOut = () => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOutUser();
            navigate('/Home');
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    };

    return (
        <button onClick={handleSignOut}>Log Out</button>
    )
};
