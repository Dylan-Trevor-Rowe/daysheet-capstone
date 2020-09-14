
import { TourContext } from './TourProvider'
import React, { useContext, useEffect } from 'react'
import './Tour.css'




export const TourList = (props) => {

    const { tours, getTour } = useContext(TourContext)

    useEffect(() => {
        getTour()
    }, [])


 
    return <>
 
        <section className="tour__Container">
            {
                tours.map(tour => {
                    return <article key={tour.id} className="tour__Card">
                        <div><h3>date: {tour.date}</h3></div>
                        <div><h3>date: {tour.tourName}</h3></div>
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
                        <button>delete</button>
                        <button>edit</button>
                    </article>
                    
                })
            }

          
        </section>
    </>
}