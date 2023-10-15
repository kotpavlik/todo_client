import { AxiosHeaders } from "axios";


export interface ResponseType<D> {
    config?: {}
    data: D
    headers: AxiosHeaders
    request: XMLHttpRequest
    status: number
    statusText: string
} 
