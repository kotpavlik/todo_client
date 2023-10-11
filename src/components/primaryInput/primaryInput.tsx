import React, { ChangeEvent, KeyboardEvent } from 'react';
import style from './primaryInput.module.scss'

type PrimaryInputType = {
    required?: boolean
    type?: string
    plaaceholder?: string
    value: string
    onHandleChange: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void
}

export const PrimaryInput = React.memo(({ onKeyPress, required, type, onHandleChange, plaaceholder, value }: PrimaryInputType) => {
    return (
        <input type={type} required={required}
            placeholder={plaaceholder} className={style.input} onChange={(e) => onHandleChange(e)} value={value}
            onKeyDown={(e) => (onKeyPress && onKeyPress(e))} />

    );
})