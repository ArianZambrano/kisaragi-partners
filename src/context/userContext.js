import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import isAuthenticated from '../services/AuthService';
import Login from '../pages/Login';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState()
    const navigate = useNavigate();

    //FIXME: INTEGRATION
    useEffect(()=>{
        if (isAuthenticated){
            setCurrentUser({
                username: 'admin'
            })
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