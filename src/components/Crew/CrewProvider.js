import { useState } from 'react'
import React from 'react'

export const CrewContext = React.createContext()

export const CrewProvider = (props) => {
    const [crew, setCrew] = useState([])
    const [crewJoinerTable, setCrewJoinerTable] = useState([])

    function getCrewMembers() {
        return fetch(`http://localhost:8088/crewMember`)
            .then((res) => res.json())
            .then(setCrew)
    }
    const getCrewAndJoinTable = () => {
        return fetch(`http://localhost:8088/tourAndCrewJoiner`)
            .then((res) => res.json())
            .then(setCrewJoinerTable)
          
    }

    const addCrewMember = (crew,tourId ) => {
        // adds a crew member then updates the Joiner table with the tourId the user selected and 
        // the crewMember Id 
        return fetch('http://localhost:8088/crewMember', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(crew),
        })  .then((res) => res.json())
    
        .then((res) => {
            console.log(res)
            addCrewMemberJoinTable(res.id, tourId)
        } ).then(getCrewMembers)
        
    }

    const releaseCrewMember = (crewMemberId) => {
        return fetch(`http://localhost:8088/crewMember/${crewMemberId}`, {
            method: 'DELETE',
        }).then(getCrewMembers)
    }
    // const releaseCrewMemberTable = (crewMemberId) => {
    //     return fetch(`http://localhost:8088/crewMember/${crewMemberId}`, {
    //         method: 'DELETE',
    //     }).then(getCrewAndJoinTable)
    // }

    const editCrewMember = (crewMemberId, crew) => {
        return fetch(`http://localhost:8088/crewMember/${crewMemberId}`, {
            method: 'PATCH',
            body: JSON.stringify(crew),
        }).then(getCrewMembers)
    }
    const addCrewMemberJoinTable = (crewId,tourId) => {
        return fetch('http://localhost:8088/tourAndCrewJoiner', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({crewMemberId:crewId, tourId}),
        }).then(getCrewMembers)
    }

    return (
        <CrewContext.Provider
            value={{
                getCrewMembers,
                crew,
                setCrew,
                releaseCrewMember,
                addCrewMember,
                addCrewMemberJoinTable,
                getCrewAndJoinTable,
                crewJoinerTable,
                 setCrewJoinerTable,
                
            }}
        >
            {props.children}
        </CrewContext.Provider>
    )
}