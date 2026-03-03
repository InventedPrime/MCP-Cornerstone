import { useLocation, useNavigate } from "react-router-dom";
import { signOutUser } from "../utils/firebase";

export const SignUpButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <button disabled={location.pathname === '/SignUp'} onClick={() => navigate('/SignUp')}>Sign Up</button>
    )
};

export const LogInButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <button disabled={location.pathname === '/LogIn'} onClick={() => navigate('/LogIn')}>Log In</button>
    )
}
    
export const LogOutButton = () => {
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
