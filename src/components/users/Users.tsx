import { ChangeEvent, useCallback, useState, KeyboardEvent, MouseEvent } from "react"
import { FETCH_NEW_USER, REMOVE_USER } from "../../redux/TypesForActions/typesForActions"
import { useAppSelector } from "../../redux/store"
import style from "./Users.module.scss"
import { PrimaryButton } from "../buttons/primary_button/primaryButton"
import { useDispatch } from "react-redux"
import { PrimaryInput } from "../primaryInput/primaryInput"
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useNavigate } from "react-router-dom"




export const Users = () => {

    const dispatch = useDispatch();
    const users = useAppSelector(state => state.users.users)
    const navigate = useNavigate()
    const [username, setUsername] = useState<string>('')

    console.log(users)
    const addNewUserOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const username = e.currentTarget.value
        setUsername(username)
    }, [])

    const addNewUserHandler = useCallback(
        () => {
            dispatch({ type: FETCH_NEW_USER, username })
            setUsername('')
        }, [username, dispatch]
    )

    const removeUserHandler = (user_id: string | undefined, e: MouseEvent<SVGSVGElement>) => {
        e.stopPropagation()
        if (user_id) dispatch({ type: REMOVE_USER, payload: { user_id } })
    }
    const onPressEnter = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        let trimUsername = username.trim();
        if (trimUsername === 'wtf' || trimUsername === 'fuck') {
            setUsername('');
            alert('не ругайся')
            return;
        }
        if (e.keyCode === 13) {
            addNewUserHandler();
        }
    }, [username, addNewUserHandler])

    const getDesksOfUser = (user_id: string) => {
        navigate(`${user_id}`)

    }


    return (
        <div className={style.users}>
            <h1 className={style.title_app}>Use the best
                <span className={style.title_v}>
                    TODO WEB APP
                </span>
                for create tasks,delete tasks, update your tasks.You can check your work time and much more 💻
            </h1>
            <div className={style.add_user}>
                <h1 className={style.title}>Choise or create account</h1>
                <PrimaryInput onHandleChange={addNewUserOnChange} value={username} onKeyPress={onPressEnter} />
                <PrimaryButton buttonHandler={addNewUserHandler} name={'add user'} />
            </div>

            <div className={style.users_list}>
                <h1 className={style.title}>
                    All Users
                </h1>
                <div className={style.list_about_users}>
                    {users.map((u) => {
                        return (
                            <div key={u._id} className={style.user} onClick={() => (u._id && getDesksOfUser(u._id))}> {u.username}
                                <div className={style.remove}  >
                                    < ClearOutlinedIcon onClick={(e: MouseEvent<SVGSVGElement>) => removeUserHandler(u._id, e)} fontSize={"small"} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    );
}
