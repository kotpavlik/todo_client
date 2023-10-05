import { AxiosHeaders } from "axios";
import { UserType } from "../../redux/Types/storeTypes";

export interface ResponseUserType {
    config?: {}
    data: UserType[]
    headers: AxiosHeaders
    request: XMLHttpRequest
    status: number
    statusText: string
} 