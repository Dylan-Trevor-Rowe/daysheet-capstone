import { CrewContext } from '../Crew/CrewProvider'

import React, { useContext, useEffect } from 'react'
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
                        <div><h3> crew members</h3></div>
                        <div><h3>name: {crews.fullName}</h3></div>
                        <div> perdiem: {crews.perdiem}</div>
                        <div>payAmount: {crews.payAmount}</div>
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