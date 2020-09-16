import { CrewContext } from '../Crew/CrewProvider'

import React, { useContext, useEffect, useRef, useState } from 'react'
import '../Tour/Tour.css'
import { useHistory } from "react-router-dom";




export const CrewList = () => {
    const history = useHistory()
    const { crew, getCrewMembers, releaseCrewMember } = useContext(CrewContext)
    useEffect(() => {
        getCrewMembers().then(releaseCrewMember)
    

    }, [])
    return <>
        <section className="crew__Container">





            {
                crew.map(crews => {
                   return <article key={crews.id} className="tour__Card">
                        <div><h3>date: {crews.fullName}</h3></div>
                        <div><h3> {crews.perdiem}</h3></div>
                        <div>venue: {crews.payAmount}</div>
                        <button onClick={e => {

                            releaseCrewMember(crews.id)
                            history.push('/')

                        }}>delete</button>
                        <button >edit</button>

                    </article>
                })
            }
        </section>
    </>
}