import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuth } from '../services/AuthService';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState()
    const navigate = useNavigate();

    useEffect(()=>{
        if (isAuth()){
            setCurrentUser(JSON.parse(isAuth()))
        }
        else {
            navigate('/login')
        }
    }, [])

    return (
        <UserContext.Provider value={[currentUser, setCurrentUser]}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext