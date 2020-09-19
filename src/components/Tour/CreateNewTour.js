import React, { useContext, useEffect, useRef, useState } from 'react'
import { TourContext } from './TourProvider'
import './Tour.css'
import { useHistory, Link } from "react-router-dom";



export const CreateNewTour = () => {
    const history = useHistory()
const newTourNames = useRef()

    const { tourNames, getTourName, addTourForm } = useContext(TourContext)
    const [filteredTours, setTours] = useState([])

    useEffect(() => {
        getTourName()
    }, [])

    useEffect(() => {
        const userTours = tourNames.filter(tour => tour.userId === parseInt(localStorage.getItem("tour_manager")))
        setTours(userTours)
    }, [])

    const ConstructANewTour = () => {
    
        const newTourName = {
            tourName: newTourNames.current.value,
            userId: parseInt(localStorage.getItem("tour_manager")),
        }
        addTourForm(newTourName)
    }
    return <>
            <Link to="/"><button className="home">home</button></Link>
        <article className="tour__Form">
      
            <label className="form__Label">
                <input type="text" placeholder="Tour Name" ref={newTourNames} />
            </label>
    
            <button className="submitNewTour" onClick={e => {
                e.preventDefault()
                ConstructANewTour()
                history.push('/')
            }}>
                Create a new Tour
            </button>
            
    
        </article>

    </>

}