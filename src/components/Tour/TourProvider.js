import { useState } from "react";
import React from 'react'

export const TourContext = React.createContext()

export const TourProvider = (props) => {
const [tours, setTour] = useState([])

const getTour = () => {
    return fetch('http://localhost:8088/tourDay')
    .then(res => res.json())
    .then(setTour)
}

const addTour = tour => {
    return fetch("http://localhost:8088/tourDay", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tour)
    })
        .then(getTour)
}

return (
    <TourContext.Provider value={{
        tours, getTour, addTour
    }}>
        {props.children}
    </TourContext.Provider>
)


}