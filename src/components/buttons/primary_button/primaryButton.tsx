import React from 'react';
import style from './primaryButton.module.scss'

interface PrimaryButtonType {
    name: string
    disabled?: boolean
    buttonHandler: () => void

}

export const PrimaryButton = React.memo(({ name, buttonHandler, disabled }: PrimaryButtonType) => {
    return (
        <button type={'button'} className={style.button} disabled={disabled} onClick={buttonHandler}>
            <span className={style.button_name}>{name}</span>
        </button>
    );
})