import { createContext, useState, useEffect } from "react";
import { createUserDocFromAuth, onAuthStateChangedListener } from "../utils/firebase.utils";

export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
});

// Provider  wraps around any component needing access to context
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
       const unsubscribe = onAuthStateChangedListener((user) => { 
            if(user) {
                createUserDocFromAuth(user);
            }
            setCurrentUser(user);
        });
       // Return when unmounted from utils
       return unsubscribe;
    },[]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}