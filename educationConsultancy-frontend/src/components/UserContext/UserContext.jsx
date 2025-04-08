import  { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create the provider component
const UserProvider = ({ children }) => {
    const [studentId, setStudentId] = useState(null); // State to store the studentId

    return (
        <UserContext.Provider value={{ studentId, setStudentId }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider; // Export the provider as default