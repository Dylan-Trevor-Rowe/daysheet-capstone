import { Link } from 'react-router-dom'
import React from 'react'

export function Header(props) {
    return (
        <article className="buttons__Container">
            <Link to="/logout">
                <button className="logOut">log out</button>
            </Link>

            <Link to="/createnewtour">
                <button className="createANewTour"> create new tour</button>
            </Link>

            <Link to="/tourForm">
                <button className="createANewDay"> create a new day</button>
            </Link>

            <Link to="/crewform">
                <button className="createANewMember">create crew member</button>
            </Link>

            <select onChange={props.selectTour} name="tour" className="select__Tour">
                <option value="0">Select a tour</option>
                {props.filteredTours.map((e) => (
                    <option key={e.id} value={e.id}>
                        {e.tourName}
                    </option>
                ))}
            </select>
        </article>
    )
}
