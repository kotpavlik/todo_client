import { AxiosError } from "axios";
import { handleError } from "../../../common/errorUtils/errorUtilsFunc";
import { UserType, UsersStateType } from "../../Types/storeTypes";
import { ADD_NEW_USER, GET_ALL_USERS, GET_ALL_USERS_REQEST, REMOVE_USER, UPDATE_USER } from "../../TypesForActions/typesForActions";
import { call, put, takeEvery } from "redux-saga/effects";
import { usersApi } from "../../../api/users_api/users_api";


const initialState: UsersStateType = {
    users: [],
};

export const usersReducer = (state: UsersStateType = initialState, action: UsersReducerTypes): UsersStateType => {
    switch (action.type) {

        case GET_ALL_USERS: {
            return {
                ...state, users: action.payload && action.payload.users
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
export interface GetAllUsersACTypes {
    type: typeof GET_ALL_USERS,
    payload: {
        users: UserType[]
    }
}
export const getAllUsers = (users: UserType[]): GetAllUsersACTypes => {
    return {
        type: GET_ALL_USERS,
        payload: {
            users
        }
    } as const
}

type AddNewUserType = ReturnType<typeof addNewUser>
export interface AddNewUserACType {
    type: typeof ADD_NEW_USER,
    payload: {
        new_user: UserType
    }
}
export const addNewUser = (new_user: UserType): AddNewUserACType => {
    return {
        type: ADD_NEW_USER,
        payload: {
            new_user
        }
    } as const
}


type UpdateUserType = ReturnType<typeof updateUser>
export interface UpdateUserACType {
    type: typeof UPDATE_USER,
    payload: {
        updated_user: UserType
    }
}
export const updateUser = (updated_user: UserType): UpdateUserACType => {
    return {
        type: UPDATE_USER,
        payload: {
            updated_user
        }
    } as const
}


type RemoveUserType = ReturnType<typeof removeUser>
export interface RemoveUserACType {
    type: typeof REMOVE_USER,
    payload: {
        user_id: string
    }
}
export const removeUser = (user_id: string): RemoveUserACType => {
    return {
        type: REMOVE_USER,
        payload: {
            user_id
        }
    } as const
}


export function* getUsersSaga(): Generator<any> {
    try {
        const users: UserType[] | any = yield call(usersApi.getUsers)
        if (!users) {
            console.log('users not found,maybe database was dead')
        }
        console.log(users)
        if (users) yield put(getAllUsers(users))

    } catch (e) {
        const err = e as Error | AxiosError
        yield handleError(err)
    }
}

export function* watchgetUsers() {
    yield takeEvery(GET_ALL_USERS_REQEST, getUsersSaga);
}