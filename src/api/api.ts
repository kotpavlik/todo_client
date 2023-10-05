import axios from "axios";



export const instance = axios.create({
    baseURL: process.env.UP_TRADERS_TODO_TESTOVOE || "https://clever-plum-boot.cyclic.app/v1/",
    withCredentials: true,
})

