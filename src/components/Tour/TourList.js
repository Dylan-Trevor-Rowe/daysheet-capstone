import { TourContext } from './TourProvider'
import React, { useContext, useEffect, useState } from 'react'
import './Tour.css'
import { Header } from './TourHeader'
import { useHistory } from 'react-router-dom'
import { logo } from './img'

export const TourList = (props) => {
    // const tourDayId = parseInt(props.match.params.tourDayId)
    useEffect(() => {
        getTourName()
    }, [])

    const history = useHistory()
    const { tourDay, getTourDay, releaseTourDay, tourNames, getTourName, selectedTourId, setTourId } = useContext(TourContext)
    const filteredTours = tourNames.filter((tour) => tour.userId === parseInt(localStorage.getItem('tour_manager'))) || {}

    const [filteredDaysByTourId, setFilteredDaysByTourId] = useState([])

    const getTourNameById = (tourId) => {
        const found = tourNames.find((name) => name.id === tourId)
        // this function gets the name of the tour & then gets the id of the of the selected tour
        if (found) return found.tourName
    }
    useEffect(() => {

        if (!selectedTourId || !tourDay || tourDay.length === 0) {
            setFilteredDaysByTourId([])

            return
        }
        const days = tourDay.filter((day) => parseInt(day.tourId) === parseInt(selectedTourId))

        setFilteredDaysByTourId(days)

    }, [tourDay, selectedTourId])
    return (
        <>
            <Header filterVAL={selectedTourId} filteredTours={filteredTours} selectTour={setTourId} />
            <section  >
                <div className="picture__class">
                    <img form__image src={require('/home/useradd/workspace/daysheet/src/components/daySheet.jpg')} />
                </div>
                <div className="holds__list">
                    {filteredDaysByTourId.map((day, index) => {
                        return (
                            <div className="tour__Card" key={day, index}>
                                <h2><div className="tour-name">{getTourNameById(selectedTourId)}</div></h2>
                                <div className="container"> Venue Name:  {day.venueName}</div>
                                <div> Date: {new Date(day.date).toLocaleDateString('en-Us')}</div>
                                <div className="list__text">Venue Location:  {day.venueLocation} </div>
                                <div>Promoter Contact:  {day.promoterContact}</div>
                                <div>Load In:  {day.loadIn}</div>
                                <div>SoundCheck:  {day.soundCheck}</div>
                                <div>Catering:  {day.catering}</div>
                                <div>Buyout:  {day.buyOut}</div>
                                <div>Set time:  {day.setTime}</div>
                                <div>Hotel:  {day.Hotel}</div>
                                <div> Hotel Location:  {day.hotelLocation} </div>
                                <button className="card__button"
                                    onClick={(e) => {
                                        releaseTourDay(day.id).then(getTourDay)
                                    }}
                                >delete
                            </button>
                                <button onClick={(props) => {
                                    history.push(`/editTours/edit/${day.id}`)
                                    getTourDay()
                                }} className="card__button">Edit</button>
                            </div>)
                    })}
                </div>
            </section>
        </>
    )
}