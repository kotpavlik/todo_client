import axios from "axios";

//  process.env.REACT_APP_UP_TRADERS_TODO_TESTOVOE
//'http://localhost:8080/v1/'


export const instance = axios.create({
    baseURL: 'http://localhost:8080/v1/',
    withCredentials: true,
})

