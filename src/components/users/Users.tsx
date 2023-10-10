import { ChangeEvent, useCallback, useState } from "react"
import { FETCH_NEW_USER, REMOVE_USER } from "../../redux/TypesForActions/typesForActions"
import { useAppSelector } from "../../redux/store"
import style from "./Users.module.scss"
import { PrimaryButton } from "../buttons/primary_button/primaryButton"
import { useDispatch } from "react-redux"
import { PrimaryInput } from "../primaryInput/primaryInput"
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';


export const Users = () => {

    const dispatch = useDispatch();
    const users = useAppSelector(state => state.users.users)
    const [username, setUsername] = useState<string>('')


    const addNewUserOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);

        const username = e.currentTarget.value
        setUsername(username)
    }, [])

    const addNewUserHandler = useCallback(
        () => {
            dispatch({ type: FETCH_NEW_USER, username })
            setUsername('')
        }, [username, dispatch]
    )

    const removeUserHandler = (user_id: string | undefined) => {
        if (user_id) dispatch({ type: REMOVE_USER, payload: { user_id } })
    }



    return (
        <div className={style.users}>
            <div className={style.add_user}>
                <h1 className={style.title}>Choise or create</h1>
                <PrimaryInput onHandleChange={addNewUserOnChange} value={username} />
                <PrimaryButton buttonHandler={addNewUserHandler} name={'add user'} />
            </div>

            <div className={style.users_list}>
                <h1 className={style.title}>
                    All Users
                </h1>
                <div className={style.list_about_users}>
                    {users.map((u) => {
                        return (
                            <div key={u._id} className={style.user}> {u.username}
                                <div className={style.remove}  >
                                    < ClearOutlinedIcon onClick={() => removeUserHandler(u._id)} fontSize={"small"} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    );
}
