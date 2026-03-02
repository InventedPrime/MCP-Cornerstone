import { onAuthStateChanged, type User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";

type AuthContextType = {
    user: User | null;
    loading: boolean; // this prevents the app from rendering before the user is logged in 
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
})

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser);
            setLoading(false);
        });
        return () => unsub(); // prevents memory leaks so the listener is removed when component unmounts
    }, [])

    return (
        <AuthContext.Provider value={{user: currentUser, loading}}> 
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
