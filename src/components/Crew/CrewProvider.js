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

    const addCrewMember = (crew, tourId) => {
        return fetch('http://localhost:8088/crewMember', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(crew),
        }).then((res) => res.json())
    }

    const releaseCrewMember = (crewMemberId) => {
        return fetch(`http://localhost:8088/crewMember/${crewMemberId}`, {
            method: 'DELETE',
        }).then(getCrewMembers)
    }
    const editCrewMember = (crewMemberId, crew) => {
        return fetch(`http://localhost:8088/crewMember/${crewMemberId}`, {
            method: 'PATCH',
            body: JSON.stringify(crew),
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
                getCrewAndJoinTable,
                editCrewMember
            }}>
            {props.children}
        </CrewContext.Provider>)
}