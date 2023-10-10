import { AxiosError } from "axios";
import { handleError } from "../../../common/errorUtils/errorUtilsFunc";
import { UserType, UsersStateType } from "../../Types/storeTypes";
import { ADD_NEW_USER, FETCH_NEW_USER, GET_ALL_USERS, GET_ALL_USERS_REQEST, REMOVE_USER, UPDATE_USER } from "../../TypesForActions/typesForActions";
import { call, put, takeEvery } from "redux-saga/effects";
import { usersApi } from "../../../api/users_api/users_api";
import { SetError, SetStatus } from "../appReducer/appReducer";


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


export type UsersReducerTypes = GetUsersType | addNewUserSucsessType | UpdateUserType | RemoveUserType

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

type addNewUserSucsessType = ReturnType<typeof addNewUserSucsess>
export interface AddNewUserACType {
    type: typeof ADD_NEW_USER,
    payload: {
        new_user: UserType
    }
}
export const addNewUserSucsess = (new_user: UserType): AddNewUserACType => {
    return {
        type: ADD_NEW_USER,
        payload: {
            new_user
        }
    } as const
}

type fetchNewUserType = ReturnType<typeof fetchNewUser>
export const fetchNewUser = (username: string) => {
    return { type: FETCH_NEW_USER, username }
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
// type fetchRemoveUserType = ReturnType<typeof fetchRemoveUser>
// export const fetchRemoveUser = (user_id: string) => {
//     return { type: FETCH_REMOVE_USER, user_id }
// }


export function* getUsersSaga(): Generator<any> {
    try {
        yield put(SetStatus('loading'))
        const users: UserType[] | any = yield call(usersApi.getUsers)
        if (!users) {
            yield put(SetStatus('failed'))
            console.log('users not found,maybe database was dead')
        }
        if (users) {
            yield put(SetStatus('succeeded'))
            yield put(getAllUsers(users))
        }
    } catch (e) {
        const err = e as Error | AxiosError
        yield handleError(err)
    }
}

export function* watchgetUsers() {
    yield takeEvery(GET_ALL_USERS_REQEST, getUsersSaga);
}


export function* addNewUserSaga({ username }: fetchNewUserType): Generator<any> {
    try {
        yield put(SetStatus('loading'))
        const new_user: UserType | any = yield call(usersApi.addUser, username)
        if (!new_user) {
            yield put(SetStatus('failed'))
        }
        if (new_user) {
            yield put(addNewUserSucsess(new_user))
            yield put(SetStatus('succeeded'))
        }
    } catch (e) {
        const err = e as Error | AxiosError
        const checkError = yield handleError(err)
        if (checkError) yield put(SetError(checkError.toString()))
        yield put(SetStatus('failed'))
    }
}
export function* watchgetAddNewuser() {
    yield takeEvery(FETCH_NEW_USER, addNewUserSaga);
}


export function* removeUserSaga({ payload }: RemoveUserACType): Generator<any> {
    try {
        console.log('saga');

        yield put(SetStatus('loading'))
        const remove_user: UserType | any = yield call(usersApi.removeUser, payload.user_id)
        console.log(remove_user);

        if (!remove_user) {
            yield put(SetStatus('failed'))
        }
        if (remove_user) {
            yield put(removeUser(remove_user._id))
            yield put(SetStatus('succeeded'))
        }
    } catch (e) {
        const err = e as Error | AxiosError
        const checkError = yield handleError(err)
        if (checkError) yield put(SetError(checkError.toString()))
        yield put(SetStatus('failed'))
    }
}
export function* watchRemoveUser() {
    yield takeEvery(REMOVE_USER, removeUserSaga);
}