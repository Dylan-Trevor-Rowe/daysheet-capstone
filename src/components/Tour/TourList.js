import { TourContext } from './TourProvider'
import React, { useContext, useEffect, useRef } from 'react'
import './Tour.css'
import { useHistory } from "react-router-dom";

const findTourDaysByTourId = (data,tourId) => data.filter((day) => (day.tourId === tourId))

export const TourList = () => {

    console.log('RE RENDER')
    const { tourDay, getTourDay, releaseTourDay, tourNames, getTourName } = useContext(TourContext)

    //const [filteredTours, setTours] = useState([])
    useEffect(() => {
        getTourName().then(getTourDay).catch((err) => console.log(err))
    }, [])

    console.log('tourDay', tourDay)
    //useEffect(() => {
        // filters tours by user id
    const filteredTours = tourNames.filter(tour => tour.userId === parseInt(localStorage.getItem("tour_manager"))) || {}
  


    tourNames.forEach((tour) => {
      const  tourdays = findTourDaysByTourId(tourDay,tour.id);
    });

    console.log('tourNames', tourNames)

    const tourPick = useRef(null)
    const history = useHistory()

    return <>
        <article className="buttons__Container">
            <button className="logOut" onClick={e => {
                history.push('/logout')
            }}> logout</button>
            <button className="createANewTour" onClick={e => {
                history.push('/createnewtour')
            }}> create a new tour</button>
            <button className="createANewDay" onClick={e => {
                history.push('/tourForm')
            }}> create a new day</button>
            <button className="createANewMember" onClick={e => {
                history.push('/crewform')
            }}>create crew member</button>
            <select defaultValue="" name="tour" ref={tourPick} id="" className="select__Tour" >
                <option value="0">Select a tour</option>
                {filteredTours.map(e =>
                    (
                        <option key={e.id} value={e.id}>
                            {e.tourName}
                        </option>
                    ))}
            </select>
        </article>
        <section >
            {filteredTours.map((tour) => {
                console.log(tour);
                return (<div className="tour-container">
                  
                    <div className="tour-days">
                    {tourdays.map((day,i) => {
                        return (<div key={"day"}>
                            <div>{tourdays.venueName}</div>
                            <div>{tourdays.venueLocation}</div>
                            <div className="tour-name">{tour.tourName}</div>
                        </div>)
                    })}
                    </div>
                </div>);
            })}
            {/* {filteredTours.map(tour => {

                {
                    filteredTours.map(tour => {
                        const tourDays = tour.days
                        console.log(tourDays)
                        return <article key={tour.id} className="tour__Card">
                            <div><h3>date: {tourDays.date}</h3></div>
                             <div> {pickedTours.tourName}</div>
                        <div>venue: {pickedTours.venueName}</div> 
                            <div>venue address: {tourDays.venueLocation}</div>
                            <div> Promoter email: {tourDays.promoterContact}</div>
                            <div>Load in: {tourDays.loadIn}</div>
                            <div>SoundCheck: {tourDays.soundCheck}</div>
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
                    }) || {}
                } */}
        </section>
    </>
}