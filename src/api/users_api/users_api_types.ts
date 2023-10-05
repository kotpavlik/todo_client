import { AxiosHeaders } from "axios";


export interface ResponseUserType<D> {
    config?: {}
    data: D
    headers: AxiosHeaders
    request: XMLHttpRequest
    status: number
    statusText: string
} 
