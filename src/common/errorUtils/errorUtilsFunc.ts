import axios, { AxiosError } from "axios";
import { put } from 'redux-saga/effects';
import { SetError } from "../../redux/todo/appReducer/appReducer";

export const handleError = (err: Error | AxiosError) => {
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
        put(SetError(error))
    } else {
        put(SetError(
            `Native error ${err.message}`
        ))
    }
}