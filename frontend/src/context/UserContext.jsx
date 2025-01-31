import { createContext, useState } from "react"

export const userDataContext = createContext();

export default function UserContext({ children }) {

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });

    return (
        <userDataContext.Provider value={{ userData }}>
            {children}
        </userDataContext.Provider>
    )
}