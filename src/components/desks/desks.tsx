
import { useAppSelector } from '../../redux/store';
import style from './desks.module.scss'
import { useParams } from 'react-router-dom';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useDispatch } from 'react-redux';
import { REMOVE_DESK } from '../../redux/TypesForActions/typesForActions';
import { AddNewDeskModal } from './deskModal/addDeskModal';
import { PrimaryButton } from '../buttons/primary_button/primaryButton';




export const Desks = () => {

    const dispatch = useDispatch()
    const desks = useAppSelector(state => state.desks.projects)
    const users = useAppSelector(state => state.users.users)
    const { user_id } = useParams()




    if (desks.length === 0 || users.length === 0) {
        return <div></div>
    }

    const user = users.filter(u => u._id === user_id)
    const myDesks = desks.filter(d => d.creator === user_id)

    const deleteDesk = (desk_id: string) => {
        dispatch({ type: REMOVE_DESK, payload: { desk_id } })
    }


    return (
        <div className={style.desks}>

            <div className={style.title}>
                <h1 className={style.forpre}>Hello
                    <span className={style.creator_name}>{user && user[0].username}</span>
                    <div>it's yuor desks 🖥</div>
                    <div>You can choise desk and manage them 🕹</div>

                </h1>
            </div>
            <AddNewDeskModal creator={user_id!} >
                <PrimaryButton name={'add new desk'}></PrimaryButton>
            </AddNewDeskModal>
            <div className={style.projects}>

                {
                    myDesks.map((d) => {

                        return (
                            <div key={d._id} className={style.desk}>
                                <div className={style.remove}>
                                    < ClearOutlinedIcon onClick={() => deleteDesk(d._id)} fontSize={"small"} /></div>
                                <div className={style.indesk}>
                                    <div className={style.proj_name}><span className={style.st}>Desk name:</span> {d.project_name}</div>
                                    <div className={style.col_tasks}><span className={style.st}>This desk have:</span> {d.tasks.length} {d.tasks.length <= 0 ? 'task' : 'tasks'}</div>
                                </div>
                            </div>
                        )
                    }
                    )
                }
            </div>
        </div>

    );
}