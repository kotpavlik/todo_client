import React, { ChangeEvent } from 'react';
import style from './primaryInput.module.scss'

type PrimaryInputType = {
    required?: boolean
    type?: string
    plaaceholder?: string
    value: string
    onHandleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const PrimaryInput = React.memo(({ required, type, onHandleChange, plaaceholder, value }: PrimaryInputType) => {
    return (
        <input type={type} required={required}
            placeholder={plaaceholder} className={style.input} onChange={(e) => onHandleChange(e)} value={value} />

    );
})