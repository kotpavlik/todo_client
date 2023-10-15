import { desksApi } from './../../../api/desks_api/desks_api';
import { call, put, takeEvery } from "redux-saga/effects";
import { ProjectType, ProjectsType } from "../../Types/storeTypes";
import { CREATE_NEW_DESK, CREATE_NEW_DESK_REQUEST, GET_ALL_DESKS, GET_ALL_DESKS_REQUEST, GET_MY_DESKS, REMOVE_DESK, UPDATE_DESK } from "../../TypesForActions/typesForActions";
import { SetStatus } from "../appReducer/appReducer";
import { handleError } from "../../../common/errorUtils/errorUtilsFunc";
import { AxiosError } from "axios";


const initialState: ProjectsType = {
    projects: [],
};

export const projectReducer = (state: ProjectsType = initialState, action: ProjectActionsType) => {
    switch (action.type) {
        case GET_ALL_DESKS: {
            return { ...state, projects: action.payload && action.payload.desks }
        }
        case GET_MY_DESKS: {
            return { ...state }
        }
        case CREATE_NEW_DESK: {
            console.log(action.payload.data_desk)
            return { ...state, projects: [...state.projects, action.payload.data_desk] }
        }
        case UPDATE_DESK: {
            return { ...state }
        }
        case REMOVE_DESK: {
            return {
                ...state, projects: state.projects.filter(p => p._id !== action.payload.desk_id)
            }
        }
        default: return state
    }
}
export type ProjectActionsType = GetAllDesksType | GetMyDesksType | UpdateDeskType | DeleteDeskType | addDeskType

type GetAllDesksType = ReturnType<typeof GetAllDesks>
export const GetAllDesks = (desks: ProjectType[]) => {
    return {
        type: GET_ALL_DESKS,
        payload: {
            desks
        }
    } as const
}


type GetMyDesksType = ReturnType<typeof GetMyDesks>
export const GetMyDesks = (user_id: string) => {
    return {
        type: GET_MY_DESKS,
        payload: {
            user_id
        }
    } as const
}


type UpdateDeskType = ReturnType<typeof UpdateDesk>
export const UpdateDesk = (desk_name: string, user_id: string) => {
    return {
        type: UPDATE_DESK,
        payload: {
            desk_name,
            user_id
        }
    } as const
}

type addDeskType = ReturnType<typeof AddDesk>
export const AddDesk = (data_desk: ProjectType) => {
    return {
        type: CREATE_NEW_DESK,
        payload: {
            data_desk
        }
    } as const
}

type addDeskRequest = ReturnType<typeof AddDeskRequest>
export const AddDeskRequest = (project_name: string, creator: string) => {
    return {
        type: CREATE_NEW_DESK_REQUEST,
        payload: {
            project_name,
            creator
        }
    }

}


type DeleteDeskType = ReturnType<typeof DeleteDesk>
export const DeleteDesk = (desk_id: string) => {
    return {
        type: REMOVE_DESK,
        payload: {
            desk_id
        }
    } as const
}


export function* getAllDesksSaga(): Generator<any> {

    try {
        yield put(SetStatus('loading'))
        const desks: ProjectType[] | any = yield call(desksApi.getDesks)
        if (!desks) {
            yield put(SetStatus('failed'))
            console.log('users not found,maybe database was dead')
        }
        yield put(GetAllDesks(desks))
        yield put(SetStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError
        yield handleError(err)
    }
}

export function* watchAllDesks() {
    yield takeEvery(GET_ALL_DESKS_REQUEST, getAllDesksSaga);
}




export function* deleteDeskSaga({ payload }: DeleteDeskType): Generator<any> {
    try {
        yield put(SetStatus('loading'))
        const deleted_desk: ProjectType | any = yield call(desksApi.removeDesk, payload.desk_id)
        if (!deleted_desk) yield put(SetStatus('failed'))
        yield put(SetStatus('succeeded'))
    } catch (e) {
        yield put(SetStatus('failed'))
        const err = e as Error | AxiosError
        yield handleError(err)
    }
}
export function* watchDeleteDesk() {
    yield takeEvery(REMOVE_DESK, deleteDeskSaga);
}



export function* addDeskSaga({ payload }: addDeskRequest): Generator<any> {
    try {
        yield put(SetStatus('loading'))
        const newDesk: ProjectType | any = yield call(desksApi.addNewDesk, payload)
        if (!newDesk) yield put(SetStatus('failed'))
        yield put(AddDesk(newDesk))
        yield put(SetStatus('succeeded'))
    } catch (e) {
        yield put(SetStatus('failed'))
        const err = e as Error | AxiosError
        yield handleError(err)
    }
}
export function* watchAddDeskSaga() {
    yield takeEvery(CREATE_NEW_DESK_REQUEST, addDeskSaga);
}