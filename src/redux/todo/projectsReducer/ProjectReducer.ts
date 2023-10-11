import { ProjectsType } from "../../Types/storeTypes";
import { GET_ALL_DESKS, GET_MY_DESKS, REMOVE_DESK, UPDATE_DESK } from "../../TypesForActions/typesForActions";

const initialState: ProjectsType = {
    projects: [],
};

export const projectReducer = (state: ProjectsType = initialState, action: ProjectActionsType) => {
    switch (action.type) {
        case GET_ALL_DESKS: {
            return { ...state }
        }
        case GET_MY_DESKS: {
            return { ...state }
        }
        case UPDATE_DESK: {
            return { ...state }
        }
        case REMOVE_DESK: {
            return { ...state }
        }
        default: return state
    }
}
export type ProjectActionsType = GetAllDesksType | GetMyDesksType | UpdateDeskType | DeleteDeskType

type GetAllDesksType = ReturnType<typeof GetAllDesks>
export const GetAllDesks = () => {
    return {
        type: GET_ALL_DESKS,
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


type DeleteDeskType = ReturnType<typeof DeleteDesk>
export const DeleteDesk = (desk_id: string) => {
    return {
        type: REMOVE_DESK,
    } as const
}