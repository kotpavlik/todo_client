import axios, { AxiosError } from "axios";

export const handleError = (err: Error | AxiosError) => {
    console.log(err)
    if (axios.isAxiosError(err)) {
        const error: string = err.response?.data ? (err.response.data as { error: string }).error : err.message
        return error
    } else {
        return err.message
    }
}