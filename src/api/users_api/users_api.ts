
import { UserType } from '../../redux/Types/storeTypes';
import { instance } from './../api';
import { ResponseType } from './users_api_types';


export const usersApi = {
    async getUsers(): Promise<UserType[]> {
        const { data } = await instance.get<{}, ResponseType<UserType[]>>("user");
        return data

    },
    async addUser(username: string) {
        const { data } = await instance.post<{ username: string }, ResponseType<UserType>>("user", { username })
        return data
    },
    updateUser({ _id, username }: UserType) {
        const updatedUser = instance.put("user", { _id, username })
        return updatedUser
    },
    async removeUser(user_id: string) {
        const { data } = await instance.delete<{ user_id: string }, ResponseType<UserType>>(`user?user_id=${user_id}`);
        return data
    }
}