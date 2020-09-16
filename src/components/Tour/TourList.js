
import { TourContext } from './TourProvider'
// import { UserContext } from '../Users/UserProvider'
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

        const parsedTours = tourName.filter(tour => tour.userId === parseInt(sessionStorage.getItem("tour_manager"))) || {}
        const evenMoreTours = parsedTours.filter(tour => tours.tourId === tour.id) || {}

        setTours(evenMoreTours)
        console.log(evenMoreTours)
    }, [])



    const tourPick = useRef(null)



    const history = useHistory()




    return <>
        {/* <div>
        <img src="/home/useradd/workspace/daysheet/src/components/Auth/daySheet.png"/>
    </div> */}
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
            {tourName.map(e =>
                (
                    <option key={e.id} value={e.id}>
                        {e.tourName}
                    </option>
                ))

            }
        </select>
        </article>

   


        <section className="tour__Container">
            {
                tours.map(tour => {
                    const pickedTours = tourName.find(tourName => tourName.id === tour.tourId) || {}

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
