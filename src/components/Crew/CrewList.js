import { CrewContext } from '../Crew/CrewProvider'

import React, { useContext, useEffect, useState } from 'react'
import { TourContext } from '../Tour/TourProvider'
import '../Tour/Tour.css'
import { useHistory } from 'react-router-dom'


var count = 0
export const CrewList = () => {
    console.log(++count)
    const history = useHistory()
    const { crew: listCrewMembers, getCrewMembers, releaseCrewMember, getCrewAndJoinTable, setCrewJoinerTable, crewJoinerTable } = useContext(CrewContext)

    const {  getTourName, tourFilter: selectedTourId, setTourFilter, } = useContext(TourContext)

    //tourAndCrewJoiner= []

    useEffect(() => {
        getCrewMembers().then(getCrewAndJoinTable)
            .catch((err) => console.log(err))
        getTourName()
    }, [])


    //based on tourid we need to get crew members using a join table between tourId and c
    console.log("crewJoinerTable", crewJoinerTable)
    console.log("listCrewMembers", listCrewMembers)

    function getCrewMembersByTourId(tourId) {
        let crewMembers = []
        crewJoinerTable.forEach(item => {
            if (item.tourId === tourId) {
                item = listCrewMembers.find(member => member.id === item.crewMemberId)
                crewMembers.push(item)
            }
        })
        return crewMembers

    }

    let listCrewMembersByTourId = []

    if (selectedTourId){ 
        listCrewMembersByTourId = getCrewMembersByTourId(selectedTourId)
    } if(selectedTourId.tourId === undefined){
         history.push('/')
    }


    // how to name variables differently that convey 
    //which variables are functions     | var fetchCrewMembers | getTours | get USers
    //which variables are data like array | var dataCrewMembers = []
    ///which variables are id | var selectedTourId



    // const namesOfTours = tourNames.filter(tourName => {
    //     return crewJoinerTable.filter(TourFk => tourName.id === TourFk.tourId)
    // })

    // const crewMembers = crew.filter(tourmems =>  tourmems.id === crewJoinerTable.crewMemberId )



    return (
        <>
            <section className="crew__Container">
                {listCrewMembersByTourId.map((item) => {
                    return (
                        <article key={item} className="tour__Card">
                            <div>
                                <h3> crew members</h3>
                            </div>
                            <div>name: {item.fullName}</div>
                            <div> perdiem: {item.perdiem}</div>
                            <div>payAmount: {item.payAmount}</div>
                            <button
                                onClick={(e) => {
                                    releaseCrewMember(item.id)
                                    history.push('/')
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
