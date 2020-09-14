import React, { useRef, useContext, useEffect } from 'react'
import { TourContext } from './TourProvider'
import './Tour.css'




export const NewDayForm = () => {

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

    const { tourName, getTourName, addTourDay } = useContext(TourContext)

     useEffect(() => {
        getTourName()
    }, [])



    const ConstructNewDay = () => {
        const tourSelect = parseInt(tourPick.current.value)

        const newDay = {
            tourName: tourSelect,
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
            hotelLocation: hotelLocation.current.value

        }
        addTourDay(newDay)

    }






return <>
    <article className="tour__Form">
        <form className="tour__Form">
            <div className="form-group">
                <label htmlFor="tourName">tour<br></br></label>
                <select defaultValue="" name="tour" ref={tourPick} id="" className="form-control" >
                    <option value="0">Select a tour</option>
                    {tourName.map(e => (
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

            <label className="form__Label">

                <input type="text" placeholder="load in time" ref={loadIn} />
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