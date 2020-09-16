import React, { useRef, useContext, useEffect, useState } from 'react'
import { TourContext } from './TourProvider'
import './Tour.css'
import { useHistory } from "react-router-dom";


export const CreateNewTour = () => {
    const history = useHistory()
  

    const { tourName, getTourName, addTourDay, getTour, addTourForm } = useContext(TourContext)
    const [filteredTours, setTours] = useState([])

    useEffect(() => {
        getTourName()
    }, [])

    useEffect(() => {
         
        const userTours = tourName.filter(tour => tour.userId === parseInt(localStorage.getItem("tour_manager")))
      
        setTours(userTours)

    }, [])



     const ConstructANewTour = () => {

        const newTourName = {
            tourName:tourName.current.value,
            userId: parseInt(localStorage.getItem("tour_manager")),

        }

        addTourForm(newTourName)
            
        

    }
    
         
    

    return <>
        <article className="tour__Form">
            <label className="form__Label">

                <input type="text" placeholder="Tour Name" ref={tourName} />
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