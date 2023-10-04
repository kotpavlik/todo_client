export interface UsersStateType {
    users: UserType[]
}

export interface UserType {
    _id: string
    username: string
}

export type requestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export interface appInitialStateType {
    status: requestStatusType
    error: string | null
    initialized: boolean
}