import React from "react"
import { TourList } from "./Tour/TourList"
import './DaySheet.css'
import { TourProvider } from "./Tour/TourProvider"
// import { Login } from "./auth/Login"
// import { Register } from "./auth/Register"


export const DaySheet = () => ( 
 <>
 <article>
<TourProvider>
<TourList />
</TourProvider>
 </article>
</>
)