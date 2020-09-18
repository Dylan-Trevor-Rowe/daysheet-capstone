import { useState } from "react";
import React from 'react'

export const TourContext = React.createContext()

export const TourProvider = (props) => {
    const [tourDay, setTour] = useState([])
    const [tourNames, setTourName] = useState([])


    const getTourDay = () => {
        return fetch(`http://localhost:8088/tourDay`)
            .then(res => res.json())
            .then(setTour).catch((err) => console.log(err))
    }
    const getTourName = () => {
        return fetch('http://localhost:8088/tour')
            .then(res => res.json())
            .then(setTourName).catch((err) => console.log(err))
    }
 

    const addTourDay = tour => {
        return fetch("http://localhost:8088/tourDay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tour)
        })
            .then(getTourDay).catch((err) => console.log(err))
    }
    const addTourForm = tour => {
        return fetch("http://localhost:8088/tour", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tour)
        })
            .then(getTourDay).catch((err) => console.log(err))
    }

    const releaseTourDay = (tourDayId) => {
        return fetch(`http://localhost:8088/tourDay/${tourDayId}`, {
            method: "DELETE",

        })
    .then(getTourDay).catch((err) => console.log(err))
    }

    return (
        <TourContext.Provider value={{
            tourDay, getTourDay, addTourDay, getTourName, tourNames, releaseTourDay, addTourForm
        }}>
            {props.children}
        </TourContext.Provider>
    )


}