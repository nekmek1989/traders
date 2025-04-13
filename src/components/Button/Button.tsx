import React from 'react';
import {ButtonProps} from "./types";


const Button = (props: ButtonProps): React.ReactNode => {
    const {children, className, onClick, type, small, smallest, alt, deleteButton} = props

    const size: string = small
        ? ' button__size-small'
        : smallest
            ? ' button__size-smallest'
            : ''

    const altButton: string = alt? ' button_alt' : ''

    const red = deleteButton ? 'button_delete' : ''

    return (
        <button
            className={ `button ${size} ${altButton} ${red} ${className}`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;