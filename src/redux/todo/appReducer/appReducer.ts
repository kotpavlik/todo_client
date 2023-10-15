import { AxiosError, all } from "axios";
import { handleError } from "../../../common/errorUtils/errorUtilsFunc";
import { appInitialStateType, requestStatusType } from "../../Types/storeTypes";
import { APP_SET_ERROR, APP_SET_INITIALIZE, APP_SET_STATUS } from "../../TypesForActions/typesForActions";
import { call, takeEvery } from 'redux-saga/effects';
import { getUsersSaga } from "../userReducer/userReducer";
import { getAllDesksSaga } from "../projectsReducer/ProjectReducer";


const InitialState: appInitialStateType = {
    status: 'idle',
    error: null,
    initialized: false
}

export const appReducer = (state = InitialState, action: appReducersType): appInitialStateType => {
    switch (action.type) {
        case APP_SET_ERROR: {
            return {
                ...state, error: action.payload.error
            }
        }
        case APP_SET_STATUS: {
            return {
                ...state, status: action.payload.status
            }
        }
        case APP_SET_INITIALIZE: {
            return {
                ...state, initialized: true
            }
        }
        default: return state
    }
}

export type appReducersType = SetErrorType | SetStatusType | SetInitialazeType

type SetStatusType = ReturnType<typeof SetStatus>
export const SetStatus = (status: requestStatusType) => {
    return {
        type: APP_SET_STATUS,
        payload: {
            status
        }
    } as const
}

type SetErrorType = ReturnType<typeof SetError>
export const SetError = (error: string | null) => {
    return {
        type: APP_SET_ERROR,
        payload: {
            error
        }
    } as const
}

type SetInitialazeType = ReturnType<typeof SetInitialaze>
export const SetInitialaze = () => {
    return {
        type: APP_SET_INITIALIZE
    } as const
}

function* setInitialize(): Generator<any> {
    try {
        yield SetStatus('loading')
        yield all([
            call(getUsersSaga), call(getAllDesksSaga)
        ])
        yield SetStatus('succeeded')
        yield SetInitialaze()
    } catch (e) {
        yield SetStatus('failed')
        const err = e as Error | AxiosError
        yield handleError(err)
    }
}

export function* watchInitialize() {
    yield takeEvery(APP_SET_INITIALIZE, setInitialize);
}