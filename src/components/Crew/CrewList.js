import { CrewContext } from '../Crew/CrewProvider'

import React, { useContext, useEffect, useState } from 'react'
import { TourContext } from '../Tour/TourProvider'
import '../Tour/Tour.css'
import { useHistory } from 'react-router-dom'



export function CrewList() {

    const { crew: listCrewMembers, getCrewMembers, releaseCrewMember, getCrewAndJoinTable, crewJoinerTable } = useContext(CrewContext)

    const { selectedTourId } = useContext(TourContext)

    const [filteredTourMembers, setFilteredTourMembers] = useState([])
console.log( 'reRender')



    useEffect(() => {
        getCrewMembers()
        getCrewAndJoinTable()

    }, [])

    useEffect(() => {

        if (selectedTourId) {
            let crewMembers = []
            crewJoinerTable.forEach(item => {
                if (item.tourId === selectedTourId) {
                    const x = listCrewMembers.filter(member => member.id === item.crewMemberId)
                    x.forEach(i => crewMembers.push(i))
                }

            })
            setFilteredTourMembers(crewMembers)
        }

    }, [selectedTourId, listCrewMembers])



 if (filteredTourMembers.length === 0 || selectedTourId === 0) {
        return (
            <section className="nocrew__Container"> no crew members on this tour</section>
        )
    }
    return (
        <>
            <section className="crew__Container">
                {filteredTourMembers.map((item, key) => {

                    return (
                        <article key={key} className="tour__Card">
                            <div>
                                <h3> crew members</h3>
                            </div>
                            <div>name: {item.fullName}</div>
                            <div> perdiem: {item.perdiem}</div>
                            <div>payAmount: {item.payAmount}</div>
                            <button
                                onClick={() => {
                                    releaseCrewMember(item.id).then(() => {

                                       getCrewMembers()

                                    })

                                }}
                            >
                                delete
                            </button>
                            {/* <button>edit</button> */}
                        </article>
                    )
                })}
            </section>
        </>
    )
}