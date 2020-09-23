import React, { useRef, useContext, useEffect, useState } from 'react'
import { TourContext } from './TourProvider'
import './Tour.css'
import { useHistory, Link } from 'react-router-dom'

export const NewDayForm = (props) => {
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

    const { tourNames, getTourName, addTourDay, updateTourDay, getTourDay,  } = useContext(TourContext)
    const [filteredTours, setTours] = useState([])
    const [tourDay, setTourDay] = useState({})

    useEffect(() => {
        getTourName().catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        const userTours = tourNames.filter((tour) => tour.userId === parseInt(localStorage.getItem('tour_manager'))) || {}
        setTours(userTours)
    }, [tourNames])

    const editMode = props.match.params.hasOwnProperty("tourDayId")  
   

  
 
  

    const handleControlledInputChange = (e) => {
       
        const newTourDay = Object.assign({}, tourDay)          
        newTourDay[e.target.name] = e.target.value    
        setTourDay(newTourDay)                                 
    }

   
    const getTourDayInEditMode = (props) => {
        if (editMode) {
            const tourDayId = parseInt(props.match.params.id)
            const selectedTour = tourDay.find(td => td.id === tourDayId) || {}
            setTours(selectedTour)
        }
    }

    useEffect(() => {
        getTourDay()
        
    }, [])

    useEffect(() => {
        getTourDayInEditMode()
    }, [tourDay])


    const ConstructNewDay = (props) => {
        const tourSelect = parseInt(tourPick.current.value)
        if(editMode) { 
            updateTourDay({
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
        })
        .then(history.push('/'))
        } else { 
        
        

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
           props.history.push('/tours')
        })
    } }
    return (
        <>
            <Link to="/">
                <button className="logOut">home</button>
            </Link>
            <article className="tour__Form">
                <form className="tour__Form">
                    <div className="form-group">
                        <label htmlFor="tourName">
                            tour<br></br>
                        </label>
                        <select defaultValue="" name="tour" ref={tourPick} id="" className="form-control">
                            <option value="0">Select a tour</option>
                            {filteredTours.map((e) => (
                                <option key={e.id} value={e.id}>
                                    {e.tourName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <label className="form__Label">
                        date: <br></br>
                        <input type="date" ref={date}  defaultValue={tourDay.date}  onChange={handleControlledInputChange}/>
                    </label>
                    <label className="form__Label">
                        <input type="text" placeholder="venue Name" ref={venueName}   defaultValue={tourDay.venueName} onChange={handleControlledInputChange} />
                    </label>

                    <label className="form__Label">
                        <input type="text" placeholder="venue Location" ref={venueLocation} defaultValue={tourDay.venueLocation}  onChange={handleControlledInputChange}/>
                    </label>
                    <label className="form__Label">
                        <input type="text" placeholder="promoter email" ref={promoterContact}  defaultValue={tourDay.promoterContact} onChange={handleControlledInputChange} />
                    </label>
                    <label className="form__Label">
                        <input type="text" placeholder="load in time" ref={loadIn}  defaultValue={tourDay.loadIn} onChange={handleControlledInputChange} />
                    </label>
                    <label className="form__Label">
                        <input type="text" placeholder="soundcheck time" ref={soundCheck} defaultValue={tourDay.soundCheck}  onChange={handleControlledInputChange} />
                    </label>
                    <label className="form__Label">
                        <input type="text" placeholder="catering" ref={catering}  defaultValue={tourDay.catering} onChange={handleControlledInputChange} />
                    </label>
                    <label className="form__Label">
                        <input type="text" placeholder="buyout" ref={buyOut}  defaultValue={tourDay.buyOut} onChange={handleControlledInputChange}/>
                    </label>
                    <label className="form__Label">
                        <input type="text" placeholder="set time" ref={setTime} defaultValue={tourDay.setTime}  onChange={handleControlledInputChange}/>
                    </label>
                    <label className="form__Label">
                        <input type="text" placeholder="hotel name" ref={hotelName} defaultValue={tourDay.hotelName}  onChange={handleControlledInputChange}/>
                    </label>
                    <label className="form__Label">
                        <input type="text" placeholder="hotel location" ref={hotelLocation} defaultValue={tourDay.hotelLocation}  onChange={handleControlledInputChange}/>
                    </label>
                    <button
                        className="submit__Button"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault()
                            ConstructNewDay()
                         
                        }}
                    >   
                        submit
                    </button>
                </form>
            </article>
        </>
    )
}
