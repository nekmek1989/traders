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
}

const Button: FC<IButtonProps> = ({children, className, onClick, type, small, smallest, alt}) => {
    const size: string = small? ' button__size-small'
        : smallest? ' button__size-smallest'
            : ''
    const altButton: string = alt? ' button__alt' : ''

    return (
        <button
            className={
                className
                    ? `button ` + size + altButton + ` ${className}`
                    : 'button' + size + altButton
            }
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;