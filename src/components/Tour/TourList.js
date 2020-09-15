
import { TourContext } from './TourProvider'
import React, { useContext, useEffect, useRef, useState } from 'react'
import './Tour.css'
import { useHistory } from "react-router-dom";




export const TourList = () => {

    const { tours, getTour, releaseTourDay, tourName, getTourName } = useContext(TourContext)
    

    const [filteredTours, setTours] = useState([])

    useEffect(() => {
        getTourName().then(() => {
            getTour()
        })
    }, [])

    useEffect(() => {
        const userTours = tourName.filter(tour => tour.userId === parseInt(localStorage.getItem("tour_manager")))

        setTours(userTours)

    }, [tourName])

    

    // useEffect(() => {
    //     const userTours = filteredTours.filter(tour => tour. === parseInt(localStorage.getItem("tour_manager")))
      
    //     setTours(userTours)

    // }, [tourName])
    

    const tourPick = useRef(null)



    const history = useHistory()




    return <>

        <select defaultValue="" name="tour" ref={tourPick} id="" className="form-control" >
            <option value="0">Select a tour</option>
            {filteredTours.map(e =>
                (
                    <option key={e.id} value={e.id}>
                        {e.tourName}
                    </option>
                ))

            }
        </select>

        <button onClick={e => {


            history.push('/tourForm')

        }}> create a new day</button>
        <section className="tour__Container">
            {
                tours.map(tour => {
                    const pickedTours = tourName.filter(tourName => tourName.id === tour.tourId) || {}
                

                    return <article key={tour.id} className="tour__Card">
                        <div><h3>date: {tour.date}</h3></div>
                        <div><h3> {pickedTours.tourName}</h3></div>
                        <div>venue: {tour.venueName}</div>
                        <div>venue address: {tour.venueLocation}</div>
                        <div> Promoter email: {tour.promoterContact}</div>
                        <div>Load in: {tour.loadIn}</div>
                        <div>SoundCheck: {tour.soundCheck}</div>
                        <div>Catinering: {tour.catering}</div>
                        <div>Buyout: {tour.buyOut}</div>
                        <div>Set time: {tour.setTime}</div>
                        <div>Hotel: {tour.Hotel}</div>
                        <div> Hotel Location: {tour.hotelLocation}</div>
                        <button onClick={e => {

                            releaseTourDay(tour.id)
                            history.push('/')

                        }}>delete</button>
                        <button >edit</button>
                    </article>

                })
            }
        </section>
    </>
}