import { useState } from "react";
import React from 'react'


export const UserContext = React.createContext()


export const UserProvider = (props) => {
    const [Users, setUsers] = useState([])


    const getUsers = () => {
        return fetch('http://localhost:8088/users')
            .then(res => res.json())
            .then(setUsers)
    }
    return (
        <UserContext.Provider value={{
           Users, setUsers, getUsers
        }}>
            {props.children}
        </UserContext.Provider>
    )
}