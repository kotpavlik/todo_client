import { UserType, UsersStateType } from '../../redux/Types/storeTypes';
import { instance } from './../api';


export const usersApi = {
    async getUsers() {
        const users: UsersStateType = await instance.get("user")
        return users
    },
    async addUser(username: string) {
        const newUser = await instance.post("user", { username })
        return newUser
    },
    async updateUser({ _id, username }: UserType) {
        const updatedUser = await instance.put("user", { _id, username })
        return updatedUser
    },
    async removeUser(user_id: string) {
        const deletedUser = await instance.delete(`user?user_id=${user_id}`);
        return deletedUser
    }
}