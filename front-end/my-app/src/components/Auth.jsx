import React, {useState, useEffect} from "react";
import { auth } from "../firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        auth.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        })
    },[])

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}