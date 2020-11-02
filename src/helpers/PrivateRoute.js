import React from "react";
import {Redirect, Route} from "react-router-dom";
import UserService from "../shared/services/UserService";
import TokenService from "../shared/services/TokenService";


export const PrivateRoute = ({component: Component, roles, ...rest}) => (
    <Route {...rest} render={props => {
        const currentUser = TokenService.getToken()
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect
                to={{
                    pathname: "/login",
                    state: {from: props.location},
                }}
            />
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(UserService.getRole()) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={{pathname: '/'}}/>
        }

        // authorised so return component
        return <Component {...props} />
    }}/>
);
