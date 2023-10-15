import { ProjectType } from "../../redux/Types/storeTypes";
import { instance } from "../api";
import { ResponseType } from '../users_api/users_api_types';
import { addNewDeskType } from "./desks_api_types";


export const desksApi = {
    async getDesks() {
        const { data } = await instance.get<{}, ResponseType<ProjectType[]>>("/")
        return data
    },
    async removeDesk(desk_id: string) {
        const { data } = await instance.delete<{ desk_id: string }, ResponseType<ProjectType[]>>(`/?desk_id=${desk_id}`)
        return data
    },
    async addNewDesk({ project_name, creator }: addNewDeskType) {
        const { data } = await instance.post<{ desk_name: string, creator_id: string }, ResponseType<ProjectType>>('/', { project_name, creator })
        return data
    }
}

