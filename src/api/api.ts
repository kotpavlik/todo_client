import axios from "axios";



export const instance = axios.create({
    baseURL: process.env.UP_TRADERS_TODO_TESTOVOE,
    withCredentials: true,
})

