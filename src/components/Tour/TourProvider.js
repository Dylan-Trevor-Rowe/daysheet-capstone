import { useState } from "react";
import React from 'react'

export const TourContext = React.createContext()

export const TourProvider = (props) => {
    const [tours, setTour] = useState([])
    const [tourName, setTourName] = useState([])


    const getTour = () => {
        return fetch(`http://localhost:8088/tourDay`)
            .then(res => res.json())
            .then(setTour)
    }
    const getTourName = () => {
        return fetch('http://localhost:8088/tour')
            .then(res => res.json())
            .then(setTourName)
    }
    // }
    // const getTourNameFiltered = () => {
    //     return fetch('http://localhost:8088/')
    //         .then(res => res.json())
    //         .then(setTourName)
    // }

    const addTourDay = tour => {
        return fetch("http://localhost:8088/tourDay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tour)
        })
            .then(getTour)
    }
    const addTourForm = tour => {
        return fetch("http://localhost:8088/tour", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tour)
        })
            .then(getTour)
    }

    const releaseTourDay = (tourDayId) => {
        return fetch(`http://localhost:8088/tourDay/${tourDayId}`, {
            method: "DELETE",

        })
    .then(getTour)
    }

    return (
        <TourContext.Provider value={{
            tours, getTour, addTourDay, getTourName, tourName, releaseTourDay, addTourForm
        }}>
            {props.children}
        </TourContext.Provider>
    )


}