import { createContext, useState } from "react";

export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
});

// Provider  wraps around any component needing access to context
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    
    const value = { currentUser, setCurrentUser };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}