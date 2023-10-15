import React from 'react';
import style from './primaryButton.module.scss'

interface PrimaryButtonType {
    name: string
    disabled?: boolean
    buttonHandler?: () => void
    type?: "button" | "submit" | "reset" | undefined

}

export const PrimaryButton = React.memo(({ name, buttonHandler, disabled, type }: PrimaryButtonType) => {
    return (
        <button type={type} className={style.button} disabled={disabled} onClick={buttonHandler}>
            <span className={style.button_name}>{name}</span>
        </button>
    );
})