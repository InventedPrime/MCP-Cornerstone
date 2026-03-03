import { onAuthStateChanged, type User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import type { AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
})

export const useAuth = () => useContext(AuthContext)

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
        <AuthContext.Provider value={{user: currentUser, loading: loading}}> 
            {children}
        </AuthContext.Provider>
    )
}
