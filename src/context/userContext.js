import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuth } from '../services/AuthService';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState()
    const navigate = useNavigate();

    useEffect(()=>{
        if (isAuth()){
            const user = JSON.parse(isAuth());
            setCurrentUser(user)
        }
        else {
            navigate('/login')
        }
    }, [])

    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}