import ApiConfigUrl from './ApiConfigUrl';
import TokenService from './../services/TokenService';
import Axios from 'axios';
import React from "react";
import errorHandler from "./HandleHttpError";

const ApiBackEnd = Axios.create({baseURL: ApiConfigUrl.localhost})

ApiBackEnd.interceptors.request.use(req => {
    req.headers['Authorization'] = 'Bearer ' + TokenService.getToken()
    return req
})
ApiBackEnd.interceptors.response.use(
    response => response,
    error => errorHandler(error)
)

export default ApiBackEnd;