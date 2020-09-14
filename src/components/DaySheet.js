import React, { useEffect, useState } from "react"
import { TourList } from "./Tour/TourList"
import './DaySheet.css'
import { TourProvider } from "./Tour/TourProvider"
import { Login } from './Auth/Login'
import { Register } from './Auth/Register'
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'


export const DaySheet = () => {
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        const userLoggedIn = localStorage.getItem('tour_manager')
        if (userLoggedIn) {
            setLoggedIn(true)
        }
    }, [])

    return <>
        <Router> <article>
            <Switch>
                <Route path='/register'>
                    <Register />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/' exact>
                    {
                        loggedIn ? <TourProvider>
                            <TourList />
                        </TourProvider> : <Redirect to="/login"></Redirect>
                     }
                 
                </Route>
                <Route path='/tours' exact>
                    <TourProvider>
                        <TourList />
                    </TourProvider>
                </Route>

            </Switch>

        </article>
        </Router>
    </>
}