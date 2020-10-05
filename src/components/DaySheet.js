import React, { useContext, useEffect, useState } from 'react'
import { TourList } from './Tour/TourList'
import { NewDayForm } from './Tour/TourForm'
import { CreateNewTour } from './Tour/CreateNewTour'
import './Tour/Tour.css'
import './DaySheet.css'
import { TourProvider } from './Tour/TourProvider'
import { UserProvider } from './Tour/TourProvider'
import { Login } from './Auth/Login'
import { Register } from './Auth/Register'
import {
    Route,
    Switch,
    Redirect,
    BrowserRouter as Router,
} from 'react-router-dom'
import { AddCrewForm } from './Crew/CrewForm'
import { CrewProvider } from './Crew/CrewProvider'
import { CrewList } from './Crew/CrewList'
import { ImageLogo } from './Tour/img'
// import { NewDayForm } from './Tour/TourForm'
// import { UserContext } from './Users/UserProvider'


export const DaySheet = (props) => {
    const [loggedIn, setLoggedIn] = useState(false)

   

    useEffect(() => {
        const userLoggedIn = localStorage.getItem('tour_manager')
        if (userLoggedIn) {
            setLoggedIn(true)

            
        }
    }, [])

const appName = 'Daysheet'
    return (
        <>
            <Router>
                
                <TourProvider>
                    <CrewProvider>
                        <article>
                            {/* {loggedIn === true ? <h1>true</h1>: <h1>false</h1>} */}
                            <Switch>

                                <Route path="/crewform">


                                    <AddCrewForm />
                                    <ImageLogo />

                                </Route>

                                <Route path="/register">
                                    <Register />
                                </Route>
                                {/* <Route path="/crewList">
                            <CrewList/>
                        </Route> */}
                                <Route path="/login">

                                    <Login />
                                    {/* <ImageLogo/> */}
                                </Route>
                                <Route path="/" exact>

                                    {loggedIn ? (

                                        
                                        <>
                                        
                                      
                                    
                                            <TourList />
                                            {}
                                            <CrewList />
            <section className="buttons__Container"><h1>{appName}</h1></section> 
            <section className="name__container"><h2>Welcome!</h2></section>
        

                                     
                                                  
                                            {/* <ImageLogo /> */}

                                        </>



                                    ) : (
                                            <Redirect to="/login"></Redirect>
                                        )}
                                </Route>
                                <Route path="/tourForm" exact render={

                                    props => <NewDayForm {...props} />}  >



                                </Route>


                                <Route exact path="/tours" render={
                                    
                                    props =>  <TourList {...props} />}> <CrewList></CrewList><ImageLogo />
                                </Route>


                                {/* <Route exact path="/editTours" render={

                                    props => <NewDayForm {...props} />} >
                                </Route> */}



                                <Route exact path="/editTours/edit/:tourDayId(\d+)">
                                    <NewDayForm />
                                </Route>

                                <Route path="/createnewtour" exact>

                                    <CreateNewTour></CreateNewTour>
                                    <ImageLogo />

                                </Route>
                                {/* <Route path='/crewform' exact>
                  
                    </Route> */}
                                <Route
                                    path="/logout"
                                    render={(props) => {
                                        localStorage.removeItem('tour_manager')
                                        props.history.push('/login')
                                    }}
                                ></Route>
                            </Switch>
                        </article>
                    </CrewProvider>
                </TourProvider>

            </Router>
        </>
    )
}