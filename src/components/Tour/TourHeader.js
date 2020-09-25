import { Link } from 'react-router-dom'
import React from 'react'

export function Header(props) {
    return (
        <article className="allbuttons__Container">
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

            <select value={props.tourFilter} onChange={props.selectTour} name="tour" className="select__Tour">
                {/* passing the state variable via props & passing in selectTour which = setTourById which grabs the 
                value a user selects*/}
                <option value="0">Select a tour</option>
                {props.filteredTours.map((e) => (
                    // passing in filteredTours via props. I declared this in the List component..this maps
                    // over only the tours the user has created
                    <option key={e.id} value={e.id}>
                        {e.tourName}
                    </option>
                ))}
            </select>
        </article>
        </article>
    )
}
