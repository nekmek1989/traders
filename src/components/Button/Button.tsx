// @ts-ignore
import React, {FC} from 'react';


interface IButtonProps {
    children?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    className?: string
    type?: 'button' | 'submit' | 'reset' | undefined
    small?: boolean
    alt?: boolean
    smallest?: boolean
    deleteButton?: boolean
}

const Button: FC<IButtonProps> = ({children, className, onClick, type, small, smallest, alt, deleteButton}) => {
    const size: string = small? ' button__size-small'
        : smallest? ' button__size-smallest'
            : ''
    const altButton: string = alt? ' button_alt' : ''
    const red = deleteButton ? 'button_delete' : ''

    return (
        <button
            className={ `button ` + size + altButton + red + ` ${className}`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;