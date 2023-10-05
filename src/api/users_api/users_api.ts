
import { UserType } from '../../redux/Types/storeTypes';
import { instance } from './../api';
import { ResponseUserType } from './users_api_types';


export const usersApi = {
    async getUsers(): Promise<UserType[]> {
        const { data } = await instance.get<{}, ResponseUserType>("user");
        return data

    },
    addUser(username: string) {
        const newUser = instance.post("user", { username })
        return newUser
    },
    updateUser({ _id, username }: UserType) {
        const updatedUser = instance.put("user", { _id, username })
        return updatedUser
    },
    removeUser(user_id: string) {
        const deletedUser = instance.delete(`user?user_id=${user_id}`);
        return deletedUser
    }
}