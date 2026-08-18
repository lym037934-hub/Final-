import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase"; 

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const tokenResult = await user.getIdTokenResult(true);
          const isAdminUser = tokenResult.claims?.role === "admin";

          if (!isAdminUser) {
            const userRef = doc(db, "users", user.uid);
            await setDoc(
              userRef,
              {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || "",
                photoURL: user.photoURL || "",
                lastLoginAt: serverTimestamp(),
              },
              { merge: true }
            );
          }
        } catch (error) {
          if (error.code === "permission-denied") {
            console.log("Admin user or restricted write skipped.");
          } else {
            console.error("Error syncing user data:", error);
          }
        }

        if (isMounted) setCurrentUser(user);
      } else {
        if (isMounted) setCurrentUser(null);
      }

      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // Helper method to trigger a React state re-render when Auth Profile updates
  const refreshCurrentUser = () => {
    if (auth.currentUser) {
      setCurrentUser({ ...auth.currentUser });
    }
  };

  const value = { 
    currentUser, 
    logout: () => auth.signOut(),
    refreshCurrentUser // Exposed so MyProfile can trigger immediate UI updates
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}