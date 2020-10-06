import React, { useRef, useContext, useEffect } from 'react'
import { CrewContext } from './CrewProvider'
import { TourContext } from '../Tour/TourProvider'
import '../Tour/Tour.css'
import { useHistory, Link } from 'react-router-dom'

export const AddCrewForm = () => {
    const memberName = useRef()
    const perdiem = useRef()
    const payAmount = useRef()

    const { addCrewMember, getCrewMembers} = useContext(CrewContext)
    const { tourNames, getTourName, setTourFilter} = useContext(TourContext)
    const [selectedTour, setSelectedTour] = React.useState(0)

    useEffect(() => {
        getTourName().catch((err) => console.log(err))
    }, [])


 
    const filteredTours = tourNames.filter((tour) => tour.userId === parseInt(localStorage.getItem('tour_manager'))) || {}

    const history = useHistory()

    const ConstructANewCrewMember = () => {
        const NewCrewMember = {
            fullName: memberName.current.value,
            perdiem: perdiem.current.value,
            payAmount: payAmount.current.value,
            tourId: selectedTour
            

        }
// adds crew member and a selected tour 
        addCrewMember(NewCrewMember,selectedTour).then(() => {
            history.push('/')
            setTourFilter(0)
        }).then(getCrewMembers)
          
        
    }

    return (
        <>
        <select name="tour" onChange={(e) => {
            //  on change it sets the value to the int of the users selection in the dropdown 
              setSelectedTour(parseInt(e.target.value))
        }} value={selectedTour} className="select__Tour">
                <option value="0">Select a tour</option>
                {filteredTours.map((e) => (
                    <option key={e.id} value={e.id}>
                        {e.tourName}
                    </option>
                ))}
            </select>
            <label className="form__Label">
                <input type="text" placeholder="crew Member Name" ref={memberName} />
            </label>

            <label className="form__Label">
                <input type="text" placeholder="perdiem" ref={perdiem} />
            </label>

            <label className="form__Label">
                <input type="text" placeholder="payamount" ref={payAmount} />
            </label>
            <button
                className="logOut"
                onClick={(e) => {
                    e.preventDefault()
                    ConstructANewCrewMember()
                }}
            >
                {' '}
                submit
            </button>

            <Link to="/">
                <button className="home">home</button>
            </Link>
        </>
    )
}