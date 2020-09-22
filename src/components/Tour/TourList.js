import { TourContext } from './TourProvider'
import React, { useContext, useEffect } from 'react'
import './Tour.css'
import { Header } from './TourHeader'
import { useHistory} from 'react-router-dom'



export const TourList = () => {
    const { tourDay, getTourDay, releaseTourDay, tourNames, getTourName, tourFilter, setTourId} = useContext(TourContext)



    const getTourNameById = (tourId) => {
        const found = tourNames.find((name) => name.id === tourId)
        // this function gets the name of the tour & then gets the id of the of the selected tour
        if (found) return found.tourName
    }

    useEffect(() => {
        getTourName()
            .then(getTourDay)
            .then(releaseTourDay)
            .catch((err) => console.log(err))
    }, [])

    const filteredTours = tourNames.filter((tour) => tour.userId === parseInt(localStorage.getItem('tour_manager'))) || {}



   

    let filteredDaysByTourId = []

    if (tourFilter) {
        // if a tour is selected grab the tourId from the tourdays array that equals the id 
        // of what tourName the user selected and get me those days
        filteredDaysByTourId = tourDay.filter((day) => day.tourId === tourFilter)

    }
    // }
    const history = useHistory();
    return     (
        <>
            <Header filterVAL={tourFilter} filteredTours={filteredTours} selectTour={setTourId} />
            {/* carrying over from my header component */}

            <section>
                {filteredDaysByTourId.map((day) => {
                    return (
                        <div className="tour__Card" key={'day'}>
                            <div className="tour-name">{getTourNameById(tourFilter)}</div>
                            <div>venue name: {day.venueName}</div>
                            <div>
                                venue location:
                                {day.venueLocation}
                            </div>
                            <div>
                                venue address:
                                {day.venueLocation}
                            </div>
                            <div>
                                Promoter email:
                                {day.promoterContact}
                            </div>
                            <div>Load in: {day.loadIn}</div>
                            <div>SoundCheck: {day.soundCheck}</div>
                            <div>Catinering: {day.catering}</div>
                            <div>Buyout: {day.buyOut}</div>
                            <div>Set time: {day.setTime}</div>
                            <div>Hotel: {day.Hotel}</div>
                            <div>
                                Hotel Location:
                                {day.hotelLocation}
                            </div>
                            <button
                                onClick={(e) => {
                                    releaseTourDay(day.id)
                                    history.push('/')
                                }}
                            >
                                delete
                            </button>
                            <button>edit</button>
                        </div>
                    )
                })}


            </section>
        </>
    )
}
