
import React, { useRef, useContext, useEffect, useState } from 'react'
import { TourContext } from './TourProvider'
import './Tour.css'
import { useHistory, Link } from "react-router-dom";


export const NewDayForm = () => {

    const history = useHistory()
    const date = useRef(null)
    const venueLocation = useRef(null)
    const venueName = useRef(null)
    const promoterContact = useRef(null)
    const loadIn = useRef(null)
    const soundCheck = useRef(null)
    const catering = useRef(null)
    const buyOut = useRef(null)
    const setTime = useRef(null)
    const hotelLocation = useRef(null)
    const tourPick = useRef(null)
    const hotelName = useRef(null)

    const { tourNames, getTourName, addTourDay, } = useContext(TourContext)
    const [filteredTours, setTours] = useState([])

    useEffect(() => {
        getTourName().catch((err) => console.log(err))
    }, [])

    useEffect(() => {

        const userTours = tourNames.filter(tour => tour.userId === parseInt(localStorage.getItem("tour_manager"))) || {}
        setTours(userTours)
    }, [tourNames])

    const ConstructNewDay = () => {
        const tourSelect = parseInt(tourPick.current.value)

        const newDay = {
            tourId: tourSelect,
            date: date.current.value,
            venueName: venueName.current.value,
            venueLocation: venueLocation.current.value,
            promoterContact: promoterContact.current.value,
            loadIn: loadIn.current.value,
            soundCheck: soundCheck.current.value,
            catering: catering.current.value,
            buyOut: buyOut.current.value,
            setTime: setTime.current.value,
            Hotel: hotelName.current.value,
            hotelLocation: hotelLocation.current.value,
        }
        addTourDay(newDay).then(() => {
            history.push('/')
        })
    }
    return <>
     <Link to="/"><button className="home">home</button></Link>
        <article className="tour__Form">
            <form className="tour__Form">
                <div className="form-group">
                    <label htmlFor="tourName">tour<br></br></label>
                    <select defaultValue=""  ref={tourPick} id="" className="form-control" >
                        <option value="0">Select a tour</option>
                        {filteredTours.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.tourName}
                            </option>
                        ))}
                    </select>
                </div>
                <label className="form__Label">
                    date: <br></br>
                    <input type="date" ref={date} />
                </label>
                <label className="form__Label">
                    <input type="text" placeholder="venue Name" ref={venueName} />
                </label>

                <label className="form__Label">

                    <input type="text" placeholder="venue Location" ref={venueLocation} />
                </label>
                <label className="form__Label">
                    <input type="text" placeholder="promoter email" ref={promoterContact} />
                </label>
                <label className="form__Label"><input type="text" placeholder="load in time" ref={loadIn} />
                </label>
                <label className="form__Label">
                    <input type="text" placeholder="soundcheck time" ref={soundCheck} />
                </label>
                <label className="form__Label">
                    <input type="text" placeholder="catering" ref={catering} />
                </label>
                <label className="form__Label">
                    <input type="text" placeholder="buyout" ref={buyOut} />
                </label>
                <label className="form__Label">
                    <input type="text" placeholder="set time" ref={setTime} />
                </label>
                <label className="form__Label">
                    <input type="text" placeholder="hotel name" ref={hotelName} />
                </label>
                <label className="form__Label">
                    <input type="text" placeholder="hotel location" ref={hotelLocation} />
                </label>
                <button className="submit__Button" type="submit" onClick={e => {
                    e.preventDefault()
                    ConstructNewDay()
                }}>
                    submit</button>
            </form>
        </article>
    </>
}