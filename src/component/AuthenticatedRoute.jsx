import React, { Component } from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService';

class AuthenticatedRoute extends Component {
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return <Outlet />
        } else {
            console.log(AuthenticationService.isUserLoggedIn);
            return <Navigate to="/login" />
        }

    }
}

export default AuthenticatedRoute