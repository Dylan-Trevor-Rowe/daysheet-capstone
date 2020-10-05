import { CrewContext } from '../Crew/CrewProvider'

import React, { useContext, useEffect, useState } from 'react'
import { TourContext } from '../Tour/TourProvider'
import '../Tour/Tour.css'
import { useHistory } from 'react-router-dom'



export function CrewList() {

    const { crew: listCrewMembers, getCrewMembers, releaseCrewMember, getCrewAndJoinTable, crewJoinerTable, releaseCrewMemberJoinTable } = useContext(CrewContext)

    const { selectedTourId, setTourFilter, getTourDay } = useContext(TourContext)

    const [filteredTourMembers, setFilteredTourMembers] = useState([])

    const history = useHistory()


    useEffect(() => {
        getCrewMembers()
        getTourDay()

    }, [])

//     if (selectedTourId) {
//         let crewMembers = []
//         crewJoinerTable.forEach(item => {
//             if (item.tourId === selectedTourId) {
//                 // const x = listCrewMembers.filter(member => member.id === item.crewMemberId)
//                 // console.log({x})
//                 // x.forEach(i => crewMembers.push(i))
//                 listCrewMembers.forEach(crewMem => {
//                     if (crewMem.id === item.crewMemberId) {
//                         crewMembers.push(crewMem)

//                     }
//                 })
//             }

//         })
//         setFilteredTourMembers(crewMembers)
//     }

// }, [selectedTourId, listCrewMembers])

    useEffect(() => {
        console.log({ selectedTourId, filteredTourMembers, listCrewMembers })

        if (selectedTourId) {
            let crewMembers = []
            listCrewMembers.forEach(item => {
                if (item.tourId === selectedTourId) {
                    
                    // const x = listCrewMembers.filter(member => member.id === item.crewMemberId)
                    // console.log({x})
                    // x.forEach(i => crewMembers.push(i))
                  
                            crewMembers.push(item)

                        
                   
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
                                            history.push('/')
                                            // setTourFilter(0)
                                            getTourDay()
                                        })
                                      

                                    
                                        // getCrewMembers()

                                    

                                }}
                            >
                                delete
                            </button>
                            <button>edit</button>
                        </article>
                    )
                })}
            </section>
        </>
    )
}