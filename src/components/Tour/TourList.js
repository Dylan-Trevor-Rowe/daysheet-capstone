import { TourContext } from './TourProvider'
import React, { useContext, useEffect } from 'react'
import './Tour.css'
import { useHistory } from 'react-router-dom'
// import * as PropTypes from 'prop-types'
import { Header } from './TourHeader'

const findTourDaysByTourId = (data, tourId) => data.filter((day) => day.tourId === tourId)


export const TourList = () => {
    const { tourDay, getTourDay, releaseTourDay, tourNames, getTourName } = useContext(TourContext)

    const [selectedTour, setSelectedTour] = React.useState(0)

    const getTourNameById = (tourId) => {
        const found = tourNames.find((item) => item.id === tourId)

        if (found) return found.tourName
    }

    useEffect(() => {
        getTourName()
            .then(getTourDay)
            .then(releaseTourDay)
            .catch((err) => console.log(err))
    }, [])

    const filteredTours = tourNames.filter((tour) => tour.userId === parseInt(localStorage.getItem('tour_manager'))) || {}

    tourNames.forEach((tour) => {
        tour.days = findTourDaysByTourId(tourDay, tour.id)
    })

    const history = useHistory()

    function setTourId({ target }) {
        return setSelectedTour(parseInt(target.value))
    }

    let filteredDaysByTourId = []

    if (selectedTour) {
        filteredDaysByTourId = tourDay.filter((item) => item.tourId === selectedTour)

    }
    // }
    return (
        <>
            <Header filteredTours={filteredTours} selectTour={setTourId} />

            <section>
                {filteredDaysByTourId.map((day) => {
                    return (
                        <div className="tour__Card" key={'day'}>
                            <div className="tour-name">{getTourNameById(selectedTour)}</div>
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
