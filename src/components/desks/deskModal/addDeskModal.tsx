import React, { ReactNode, KeyboardEvent } from 'react';
import style from './addDeskModal.module.scss'
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import { CREATE_NEW_DESK_REQUEST } from '../../../redux/TypesForActions/typesForActions';
import { BasicModal } from '../../../common/modal/BasicModal';
import { TextField } from '@mui/material';
import { PrimaryButton } from '../../buttons/primary_button/primaryButton';


type AddDeskModalType = {
    children: ReactNode
    creator: string
}

export const AddNewDeskModal = ({ children, creator }: AddDeskModalType) => {
    const dispatch = useDispatch()


    const formik = useFormik({
        initialValues: {
            project_name: '',
        },
        onSubmit: (values, handleClose: any) => {
            // eslint-disable-next-line no-lone-blocks
            console.log(values)
            console.log(creator)
            { creator && dispatch({ type: CREATE_NEW_DESK_REQUEST, payload: { project_name: values.project_name, creator } }) }
            formik.resetForm()
            handleClose()
        },

    });

    const handlerSubmitForm = (handleClose: () => void) => {
        formik.handleSubmit()
        handleClose()
    }

    const onKeyChange = (e: KeyboardEvent<HTMLDivElement>, handleClose: () => void) => {
        if (e.keyCode === 13) {
            formik.handleSubmit()
        }
    }
    return (
        <BasicModal childrenBtn={children} name={'Add new desk'}>
            {(handleClose) => <form className={style.InputBlock} onSubmit={() => handlerSubmitForm(handleClose)}>
                <TextField onChange={formik.handleChange} onKeyDown={(e) => { onKeyChange(e, handleClose) }}
                    name={'project_name'} style={{ marginBottom: '20px' }} value={formik.values.project_name}
                    id="standard-basic" label="Desk name" variant="standard" />
                <div className={style.blockBtn}>
                    <PrimaryButton name='cancel' buttonHandler={handleClose} ></PrimaryButton>
                    <PrimaryButton type="submit" name='save' ></PrimaryButton>
                </div>
            </form>}
        </BasicModal>
    )
}
