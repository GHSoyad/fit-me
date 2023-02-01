import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from '../Firebase/firebase.config';
import useRole from '../Hooks/useRole';

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [userInfo, setUserInfo] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const [currentUserEmail, setCurrentUserEmail] = useState('');
    const [role, roleLoading] = useRole(currentUserEmail);

    // Create user with password and email
    const createUser = (email, password) => {
        setUserLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Sign in user with password and email
    const signInWithEmail = (email, password) => {
        setUserLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Sign out user
    const signOutUser = () => {
        // localStorage.removeItem('cadenceSecretToken');
        return signOut(auth);
    }

    // Update user profile
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    }

    // Sign in user with google
    const signInWithGoogle = () => {
        setUserLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // Get signed in user data
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setCurrentUserEmail(currentUser?.email);
            const user = { ...currentUser, role };
            setUserInfo(user);
            setUserLoading(false);
        })

        return () => unsubscribe();
    }, [role])

    const authInfo = {
        userInfo,
        setUserInfo,
        createUser,
        signInWithEmail,
        signOutUser,
        updateUserProfile,
        userLoading,
        setUserLoading,
        signInWithGoogle,
        roleLoading
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;