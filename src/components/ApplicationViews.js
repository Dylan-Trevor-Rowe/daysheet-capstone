import { TourContext } from './Tour/TourProvider'
import React, { useContext, useHistory } from 'react'
import './Tour/Tour.css'
import { Link } from 'react-router-dom'

export const NavLinks = () => {

    const { tourNames } = useContext(TourContext)
    const filteredTours = tourNames.filter(tour => tour.userId === parseInt(localStorage.getItem("tour_manager"))) || {}

    return <>
        <article className="buttons__Container">
        <Link to="/"><button className="logOut">home</button></Link>

            <Link to="/logout"><button className="logOut">log out</button></Link>

            <Link to="/createnewtour"><button className="createANewTour" > create new tour </button></Link>

            <Link to="/tourForm"><button className="createANewDay" > create a new day</button></Link>

            <Link to='/crewform'><button className="createANewMember" >create crew member</button></Link>


            <select defaultValue="" name="tour" id="" className="select__Tour" >
                <option value="0">Select a tour</option>
                {filteredTours.map(e =>
                    (
                        <option key={e.id} value={e.id}>
                            {e.tourName}
                        </option>
                    ))}
            </select>
        </article>
    </>
}