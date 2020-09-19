import { TourContext } from './TourProvider'
import React, { useContext, useEffect, useHistory } from 'react'
import './Tour.css'

const findTourDaysByTourId = (data, tourId) => data.filter((day) => (day.tourId === tourId))

export const TourList = () => {

    console.log('RE RENDER')
    const { tourDay, getTourDay, releaseTourDay, tourNames, getTourName } = useContext(TourContext)

    useEffect(() => {
        getTourName().then(getTourDay).then(releaseTourDay).catch((err) => console.log(err))
    }, [])

   const history = useHistory

    const filteredTours = tourNames.filter(tour => tour.userId === parseInt(localStorage.getItem("tour_manager"))) || {}

    tourNames.forEach((tour) => {

        tour.days = findTourDaysByTourId(tourDay, tour.id);

     });
     return <>
    {
        filteredTours.map((tour) => {
        
                {tour.days.map((day) => {
                    return (<section>
                        <div className="tour__Card" key={"days"} >
                            <div className="tour-name"><h3>{tour.tourName}</h3></div>
                            <div><h3></h3>{day.venueName}</div>
                            <div>{day.venueLocation}</div>
                            <div>venue address: {day.venueLocation}</div>
                            <div> Promoter email: {day.promoterContact}</div>
                            <div>Load in: {day.loadIn}</div>
                            <div>SoundCheck: {day.soundCheck}</div>
                            <div>Catinering: {day.catering}</div>
                            <div>Buyout: {day.buyOut}</div>
                            <div>Set time: {day.setTime}</div>
                            <div>Hotel: {day.Hotel}</div>
                            <div> Hotel Location: {day.hotelLocation}</div>
                            <button onClick={e => {
                                releaseTourDay(day.id)
                                history.push('/')
                            }}>delete</button>
                            <button >edit</button>
                        </div>
                    </section>)
                })
                } 
        })
    }
    </>
}