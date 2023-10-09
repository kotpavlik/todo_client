import React from 'react';
import style from './primaryButton.module.scss'

interface PrimaryButtonType {
    name: string
    disabled?: boolean
    val?: number | string | boolean
    buttonHandler: () => void

}

export const PrimaryButton = ({ name, buttonHandler, disabled, val }: PrimaryButtonType) => {
    return (
        <button className={style.button} disabled={disabled} onClick={buttonHandler}>{name}</button>

    );
}