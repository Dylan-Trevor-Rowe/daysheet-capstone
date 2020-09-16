import { useState } from "react";
import React from 'react'

export const CrewContext = React.createContext()

export const CrewProvider = (props) => {
    const [crew, setCrew] = useState([])
   


    const getCrewMembers = () => {
        return fetch(`http://localhost:8088/crewMember`)
            .then(res => res.json())
            .then(setCrew)
    }
 

    const addCrewMember = crew => {
        return fetch("http://localhost:8088/crewMember", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(crew)
        })
            .then(getCrewMembers)
    }


    const releaseCrewMember = (crewMemberId) => {
        return fetch(`http://localhost:8088/crewMember/${crewMemberId}`, {
            method: "DELETE",

        })
    .then(getCrewMembers)
    }

  
    return (
        <CrewContext.Provider value={{
           getCrewMembers, crew, releaseCrewMember, addCrewMember
        }}>
            {props.children}
        </CrewContext.Provider>
    )



}