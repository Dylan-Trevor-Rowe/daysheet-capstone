import { useState, useEffect } from 'react'
import React from 'react'

export const TourContext = React.createContext()

export const TourProvider = (props) => {
    const [tourDay, setTour] = useState([])
    const [tourNames, setTourName] = useState([])
    const [selectedTourId, setTourFilter] = useState('')
    
    useEffect(() => {
        getTourName()
        getTourDay()

    }, [])




    function setTourId(event ) {
  
        // adding a peice of state that takes in the value of the users select
        // setTour filter takes in the value of the users select
        return setTourFilter(parseInt(event.nativeEvent.target.value))
    }

    const getTourDay = (props) => {
        return fetch(`http://localhost:8088/tourDay`)
            .then((res) => res.json())
            .then(setTour)
            .catch((err) => console.log(err))
    }
    const getTourName = () => {
        return fetch('http://localhost:8088/tour')
            .then((res) => res.json())
            .then(setTourName)
            .catch((err) => console.log(err))
    }

    const addTourDay = (tour) => {
        return fetch('http://localhost:8088/tourDay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tour),
        })
            .then(getTourDay)
            .catch((err) => console.log(err))
    }
    const addTourForm = (tour) => {
        return fetch('http://localhost:8088/tour', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tour),
        })
            .then(getTourDay)
            .catch((err) => console.log(err))
    }

    const releaseTourDay = (tourDayId) => {
        return fetch(`http://localhost:8088/tourDay/${tourDayId}`, {
            method: 'DELETE',
        }).then(getTourDay)
    }
    const updateTourDay = tour => {
        console.log(tour)
        return fetch(`http://localhost:8088/tourDay/${parseInt(tour.tourId)}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tour)
        })
            .then(getTourDay)
    }

    return (
        <TourContext.Provider
            value={{
                tourDay,
                getTourDay,
                addTourDay,
                getTourName,
                tourNames,
                releaseTourDay,
                addTourForm,
                setTourId,
                setTourFilter, 
                selectedTourId,
                updateTourDay
                
            }}
        >
            {props.children}
        </TourContext.Provider>
    )
}
