import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, OAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

interface AuthContextType {
    user: string | null;
    login: (user: string) => void;
    logout: () => void;
    googleSignIn: () => void;
    appleSignIn: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);

    const login = (user: string) => setUser(user);
    const logout = () => {
        signOut(auth)
            .then(() => setUser(null))
            .catch((error) => console.error("Sign out error:", error));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.email || null);
            } else {
                setUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Google user:", result.user);
            })
            .catch((error) => {
                console.error("Google login error:", error);
            });
    };

    const appleSignIn = () => {
        const appleProvider = new OAuthProvider('apple.com');
        signInWithPopup(auth, appleProvider)
            .then((result) => {
                console.log("Apple user:", result.user);
            })
            .catch((error) => {
                console.error("Apple login error:", error);
            });
    };

    const value = { user, login, logout, googleSignIn, appleSignIn };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }
    return context;
};