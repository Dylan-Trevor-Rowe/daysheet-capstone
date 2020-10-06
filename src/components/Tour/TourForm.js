import React, { useRef, useContext, useEffect, useState } from 'react'
import { TourContext } from './TourProvider'
import './Tour.css'
import { useHistory, Link, useParams } from 'react-router-dom'

// function isEmpty(obj) {
//     for(var key in obj) {
//         if(obj.hasOwnProperty(key))
//             return false;
//     }
//     return true;
// }





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

    const { tourNames, getTourName, addTourDay, updateTourDay, getTourDay, tourDay, setTourFilter } = useContext(TourContext)
    const [filteredTours, setTours] = useState([])
    const [tourDayLocal, setTourDayLocal] = useState({})

    const { tourDayId } = useParams()

    const editMode = tourDayId ? true : false
    let selectedTourDay = {}
    if (tourDayId && tourDay && tourDay.length) {


        selectedTourDay = tourDay.find(td => td.id === parseInt(tourDayId)) || {}

        if (!Object.keys(tourDayLocal).length) // if tourDay !== {}
        // function isEmpty(obj) {
        //     return Object.keys(obj).length === 0;
        // }
        {
            setTourDayLocal(selectedTourDay)

        }

    }
    //setTourDayLocal(parseIselectedTour)


    useEffect(() => {
        getTourName()
  
        
    }, [tourDay])
      // getTourDay() 


    useEffect(() => {
        const userTours = tourNames.filter((tour) => tour.userId === parseInt(localStorage.getItem('tour_manager'))) || {}
        setTours(userTours)
    }, [tourNames])
    // filters the users selected tours

    // const currentId =  useRef()

    //  currentId.current= parseInt(tourDayId)


    const handleControlledInputChange = (e) => {

        const newTourDay = Object.assign({}, tourDayLocal)
        // Object assign makes a clone of tourDay Local state
        newTourDay[e.target.name] = e.target.value
        setTourDayLocal(newTourDay)
    }

    const ConstructNewDay = (props) => {




        if (editMode) {

            updateTourDay({
                tourId: parseInt(tourDayId),
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
                history.push('/') 
                setTourFilter(0)
            
                
        } else {

            const tourSelect = parseInt(tourPick.current.value)

            const newDay = {
                tourId: tourSelect,
                date: Date.now(),
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
                setTourFilter(0)
                getTourDay()
            })
        }
    }
    return (
        <>
            <Link to="/">
                <div className="home__btn">

                    <button className="logOut">home</button>
                </div>

            </Link>
            <div className="form__img">
                <article className="tour__formcontainer">

                    <article className="tour__Form">
                        <form className="tour__Form">
                            <div className="form-group">
                                <label htmlFor="tourName">
                                    <br></br>
                                </label>
                                <div className="select__touronform">
                                    <select defaultValue="0" name="tour" ref={tourPick} id="" className="form-control">
                                        <option value="1">Select a tour</option>
                                        {filteredTours.map((e) => (
                                            <option key={e.id} value={e.id}>
                                                {e.tourName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <label className="form__Label">
                                date: <br></br>
                                <input type="date" ref={date} defaultValue={tourDayLocal.date} name="date" onChange={handleControlledInputChange} />
                            </label>
                            <label className="form__Label">
                                <input type="text" placeholder="venue Name" ref={venueName} name="venueName" defaultValue={tourDayLocal.venueName} onChange={handleControlledInputChange} />
                            </label>

                            <label className="form__Label">
                                <input type="text" placeholder="venue Location" ref={venueLocation} name="venueLocation" defaultValue={tourDayLocal.venueLocation} onChange={handleControlledInputChange} />
                            </label>
                            <label className="form__Label">
                                <input type="text" placeholder="promoter email" ref={promoterContact} name="promoterContact" defaultValue={tourDayLocal.promoterContact} onChange={handleControlledInputChange} />
                            </label>
                            <label className="form__Label">
                                <input type="text" placeholder="load in time" ref={loadIn} name="loadIN" defaultValue={tourDayLocal.loadIn} onChange={handleControlledInputChange} />
                            </label>
                            <label className="form__Label">
                                <input type="text" placeholder="soundcheck time" ref={soundCheck} name="soundCheck" defaultValue={tourDayLocal.soundCheck} onChange={handleControlledInputChange} />
                            </label>
                            <label className="form__Label">
                                <input type="text" placeholder="catering" ref={catering} name="catering" defaultValue={tourDayLocal.catering} onChange={handleControlledInputChange} />
                            </label>
                            <label className="form__Label">
                                <input type="text" placeholder="buyout" ref={buyOut} name="buyOut" defaultValue={tourDayLocal.buyOut} onChange={handleControlledInputChange} />
                            </label>
                            <label className="form__Label">
                                <input type="text" placeholder="set time" ref={setTime} name="setTime" defaultValue={tourDayLocal.setTime} onChange={handleControlledInputChange} />
                            </label>
                            <label className="form__Label">
                                <input type="text" placeholder="hotel name" ref={hotelName} name="hotelName" defaultValue={tourDayLocal.Hotel} onChange={handleControlledInputChange} />
                            </label>
                            <label className="form__Label">
                                <input type="text" placeholder="hotel location" ref={hotelLocation} name="hotelLocation" defaultValue={tourDayLocal.hotelLocation} onChange={handleControlledInputChange} />
                            </label>



                            <button
                                className="submit__Button"
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault()
                                    ConstructNewDay()
                                
                                    }
                                       

                                    
                                }
                            >
                                submit
    </button>
                        </form>
                    </article>
                </article>
                <div className="float__img">
                    <img className="" src={require('/home/useradd/workspace/daysheet/src/components/daySheet.jpg')} />
                </div>
            </div>





        </>
    )
}
