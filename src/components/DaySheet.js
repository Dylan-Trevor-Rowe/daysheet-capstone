import React, { useEffect, useState } from 'react'
import { TourList } from './Tour/TourList'
import { NewDayForm } from './Tour/TourForm'
import { CreateNewTour } from './Tour/CreateNewTour'
import './Tour/Tour.css'
import './DaySheet.css'
import { TourProvider } from './Tour/TourProvider'
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

export const DaySheet = (props) => {
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        const userLoggedIn = localStorage.getItem('tour_manager')
        if (userLoggedIn) {
            setLoggedIn(true)
        }
    }, [])

    return (
        <>
            <Router>
                <article>
                {/* {loggedIn === true ? <h1>true</h1>: <h1>false</h1>} */}
                    <Switch>
                 
                        <Route path="/crewform">
                            <TourProvider>
                            <CrewProvider>
                                <AddCrewForm />
                            </CrewProvider>
                            </TourProvider>
                        </Route>

                        <Route path="/register">
                            <Register />
                        </Route>
                        {/* <Route path="/crewList">
                            <CrewList/>
                        </Route> */}
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/" exact>
                   
                            {loggedIn ? (
                                <TourProvider>
                                   
                                        <CrewProvider>
                                            <TourList />
                                            <CrewList />
                               
                                        </CrewProvider>
                                  
                                </TourProvider>
                            ) : (
                                <Redirect to="/login"></Redirect>
                            )}
                        </Route>
                        <Route path="/tourForm" exact>
                            <TourProvider>
                                <NewDayForm />
                            </TourProvider>
                        </Route>
                        <Route path="/tours" exact>
                            <TourProvider>
                           
                                    <TourList />
                          
                            </TourProvider>
                        </Route>
                        <Route path="/createnewtour" exact>
                            <TourProvider>
                                <CreateNewTour></CreateNewTour>
                            </TourProvider>
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
            </Router>
        </>
    )
}
