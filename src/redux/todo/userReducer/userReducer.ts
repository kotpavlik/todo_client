
import { UserType, UsersStateType } from "../../Types/storeTypes";
import { ADD_NEW_USER, GET_ALL_USERS, REMOVE_USER, UPDATE_USER } from "../../TypesForActions/typesForActions";

const initialState: UsersStateType = {
    users: [],
};

export const usersReducer = (state: UsersStateType = initialState, action: UsersReducerTypes): UsersStateType => {
    switch (action.type) {

        case GET_ALL_USERS: {
            return {
                ...state, users: action.payload.users
            }
        }

        case ADD_NEW_USER: {
            return {
                ...state, users: [...state.users, action.payload.new_user]
            }
        }

        case UPDATE_USER: {
            return {
                ...state, users: state.users.map((u) =>
                    u._id === action.payload.updated_user._id ? { ...u, username: action.payload.updated_user.username } : u)
            }
        }
        case REMOVE_USER: {
            return {
                ...state, users: state.users.filter(u => u._id !== action.payload.user_id)
            }
        }
        default: return state
    }
};


export type UsersReducerTypes = GetUsersType | AddNewUserType | UpdateUserType | RemoveUserType

type GetUsersType = ReturnType<typeof getAllUsers>
export const getAllUsers = (users: UserType[]) => {
    return {
        type: GET_ALL_USERS,
        payload: {
            users
        }
    } as const
}

type AddNewUserType = ReturnType<typeof addNewUser>
export const addNewUser = (new_user: UserType) => {
    return {
        type: ADD_NEW_USER,
        payload: {
            new_user
        }
    } as const
}

type UpdateUserType = ReturnType<typeof updateUser>
export const updateUser = (updated_user: UserType) => {
    return {
        type: UPDATE_USER,
        payload: {
            updated_user
        }
    } as const
}


type RemoveUserType = ReturnType<typeof removeUser>
export const removeUser = (user_id: string) => {
    return {
        type: REMOVE_USER,
        payload: {
            user_id
        }
    } as const
}