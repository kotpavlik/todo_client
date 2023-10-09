import { ChangeEvent, useState } from "react"
import { FETCH_NEW_USER } from "../../redux/TypesForActions/typesForActions"
import { useAppSelector } from "../../redux/store"
import style from "./Users.module.scss"
import { PrimaryButton } from "../buttons/primary_button/primaryButton"


export const Users = () => {

    const users = useAppSelector(state => state.users.users)
    const [username, setUsername] = useState<string>('')

    const addNewUserOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const username = e.currentTarget.value
        setUsername(username)
    }


    const addNewUserHandler = (username: string) => {
        dispatch({ type: FETCH_NEW_USER, username })
        setUsername('')
    }


    return (
        <div className={style.users}>
            <div className={style.add_user}>
                <h1 className={style.title}>Choise or create</h1>
                <input className={style.input} onChange={(e) => addNewUserOnChange(e)} value={username} />
                <PrimaryButton buttonHandler={() => addNewUserHandler(username)} name={'add user'} />
            </div>

            <div className={style.users_list}>
                <h1 className={style.title}>
                    All Users
                </h1>
                {users.map((u) => {
                    return (
                        <div key={u._id} className={style.user}> {u.username} </div>
                    )
                })}
            </div>
        </div>

    );
}

function dispatch(arg0: { type: any; username: string }) {
    throw new Error("Function not implemented.")
}
