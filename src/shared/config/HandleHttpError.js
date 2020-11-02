import {toast} from "react-toastify";
import TokenService from './../services/TokenService';
import React from "react";

const errorHandler = (error) => {
    console.log("-------------------------------- Response error --------------------------------")
    console.log(error)
    console.log("------------------------------ End response error ------------------------------")

    if (!error.response) {
        window.location = "/"
    } else if (isHandlerEnabled(error.config)) {
        toast.error(
            <div className="text-center">
                <strong>Erreur dans : {error.response.config.baseURL}
                    <br/>{error.response.status} : {error.response.statusText}</strong>
            </div>
        )
    } else if (error.response.status === 403 || error.response.status === 401) {
        toast.error(
            <div className="text-center">
                <strong>Erreur dans : {error.response.config.baseURL}
                    <br/>{error.response.status} : {error.response.statusText}</strong>
            </div>
        )
        TokenService.deconnexion();
        window.location = "/login"
    }
}

const isHandlerEnabled = (config = {}) => {
    return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ?
        false : true
}

export default errorHandler;