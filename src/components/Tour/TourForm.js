import React, { useRef, useContext, useEffect, useState } from 'react'
import { TourContext } from './TourProvider'
import './Tour.css'
import { useHistory, Link, useParams } from 'react-router-dom'

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

    const { tourNames, getTourName, addTourDay, updateTourDay, getTourDay, tourDay } = useContext(TourContext)
    const [filteredTours, setTours] = useState([])
    const [ListTourDay, setTourDayList] = useState({})

    useEffect(() => {
        getTourName().catch((err) => console.log(err))
                getTourDay()
        getTourDayInEditMode()
    }, [])
console.log(ListTourDay)
    useEffect(() => {
        const userTours = tourNames.filter((tour) => tour.userId === parseInt(localStorage.getItem('tour_manager'))) || {}
        setTours(userTours)
    }, [tourNames])



  
   
const currentId =  useRef(null)
 const { tourDayId } = useParams()
 const editMode = tourDayId ? true : false
 currentId.current = tourDayId


    const handleControlledInputChange = (e) => {
       
        const newTourDay = Object.assign({}, ListTourDay)          
        newTourDay[e.target.name] = e.target.value    
        setTourDayList(newTourDay)                                 
    }

   
    const getTourDayInEditMode = () => {
        if (editMode) {
     
            const selectedTour = tourDay.find(td => td.id === tourDayId) || {}
            setTourDayList(selectedTour)
        }
    }


   

    const ConstructNewDay = (props) => {
       
     
    
 
      if(editMode) { 

           updateTourDay({ 
            tourId: currentId.current,
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
        .then(history.push('/')).then(getTourDay)
        } else { 
        
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
                        <input type="date" ref={date}  defaultValue={ListTourDay.date} name="date" onChange={handleControlledInputChange}/>
                    </label>
                    <label className="form__Label">
                        <input type="text" placeholder="venue Name" ref={venueName}  name="venueName" defaultValue={ListTourDay.venueName} onChange={handleControlledInputChange} />
                    </label>

                    <label className="form__Label">
                        <input type="text" placeholder="venue Location" ref={venueLocation} name="venueLocation"  defaultValue={ListTourDay.venueLocation}  onChange={handleControlledInputChange}/>
                    </label>
                    <label className="form__Label">
                        <input type="text" placeholder="promoter email" ref={promoterContact} name="promoterContact" defaultValue={ListTourDay.promoterContact} onChange={handleControlledInputChange} />
                    </label>
                    <label className="form__Label">
                        <input type="text" placeholder="load in time" ref={loadIn} name="loadIN" defaultValue={ListTourDay.loadIn} onChange={handleControlledInputChange} />
                    </label>
                    <label className="form__Label">
                        <input type="text" placeholder="soundcheck time" ref={soundCheck} name="soundCheck" defaultValue={ListTourDay.soundCheck}  onChange={handleControlledInputChange} />
                    </label>
                    <label className="form__Label">
                        <input type="text" placeholder="catering" ref={catering} name="catering"  defaultValue={ListTourDay.catering} onChange={handleControlledInputChange} />
                    </label>
                    <label className="form__Label">
                        <input type="text" placeholder="buyout" ref={buyOut} name="buyOut" defaultValue={ListTourDay.buyOut} onChange={handleControlledInputChange}/>
                    </label>
                    <label className="form__Label">
                        <input type="text" placeholder="set time" ref={setTime} name="setTime" defaultValue={ListTourDay.setTime}  onChange={handleControlledInputChange}/>
                    </label>
                    <label className="form__Label">
                        <input type="text" placeholder="hotel name" ref={hotelName} name="hotelName"defaultValue={ListTourDay.hotelName}  onChange={handleControlledInputChange}/>
                    </label>
                    <label className="form__Label">
                        <input type="text" placeholder="hotel location" ref={hotelLocation} name="hotelLocation" defaultValue={ListTourDay.hotelLocation}  onChange={handleControlledInputChange}/>
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
