// import { TourContext } from './TourProvider'
// import React, { useContext, useEffect, useRef } from 'react'

// import './Tour.css'


// export const TourSelect = () => {

//     const { tourName, getTourName} = useContext(TourContext)

    
// const tourPick = useRef(null)

//     useEffect(() => {
//         getTourName()
//     }, [])



//     return <>
//         <select defaultValue="" name="tour" ref={tourPick} id="" className="form-control" onChange="">
//             <option value="0">Select a tour</option>
//             {tourName.map(e => (
//                 <option key={e.id} value={e.id}>
//                     {e.tourName}
//                 </option>
//             ))}
//         </select>
//     </>
// }
