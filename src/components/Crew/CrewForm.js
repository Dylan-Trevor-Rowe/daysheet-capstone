import React, { useRef, useContext, useEffect } from 'react'
import { CrewContext } from './CrewProvider'
import '../Tour/Tour.css'
import { useHistory } from "react-router-dom";








export const AddCrewForm = () => {
    const memberName = useRef()
const perdiem = useRef()
const payAmount = useRef()

    

    const {  addCrewMember } = useContext(CrewContext)
    
    const history = useHistory()
   


    
 const ConstructANewCrewMember = () => {


    const NewCrewMember = {
         fullName: memberName.current.value,
         perdiem: perdiem.current.value,
         payAmount: payAmount.current.value
     };

     addCrewMember(NewCrewMember).then(() => {
         history.push('/');
     });


 }

     return <>

        <label className="form__Label">

            <input type="text" placeholder="crew Member Name" ref={memberName} />
        </label>

        <label className="form__Label">

            <input type="text" placeholder="perdiem" ref={perdiem} />
        </label>

        <label className="form__Label">

            <input type="text" placeholder="payamount" ref={payAmount} />
        </label>
        <button className="logOut" onClick= {(e) => {
e.preventDefault()
ConstructANewCrewMember()



  



}}> submit</button>
    </>
}