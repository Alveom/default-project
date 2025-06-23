import { createContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Monitor auth state
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  // Sign out
  const signout = () => {
    return signOut(auth);
  };

  // Google Login
  const Googleprovider = new GoogleAuthProvider();
  const googleLogin = () => {
    return signInWithPopup(auth, Googleprovider);
  };

  // Reset password
  const resetPass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Update user profile
  const profileUpdate = async (name, photo) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      // Update the user state with the new profile data
      setUser({
        ...auth.currentUser,
        displayName: name,
        photoURL: photo,
      });
    } catch (error) {
      throw error;
    }
  };

  const authData = {
    user,
    setUser,
    createUser,
    login,
    signout,
    googleLogin,
    loading,
    setLoading,
    resetPass,
    profileUpdate,
  };
  console.log(user);
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
