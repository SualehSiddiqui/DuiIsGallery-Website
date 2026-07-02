import UserContext from "./userContext";
import { useState } from "react";

const UserContextProvider = ({ children }) => {
    const userData = localStorage.getItem('userDetails') || {};
    const [user, setUser] = useState(userData)
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;