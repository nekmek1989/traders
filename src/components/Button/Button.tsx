// @ts-ignore
import React, {FC} from 'react';


interface IButtonProps {
    children?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    className?: string
    type?: 'button' | 'submit' | 'reset' | undefined
}

const Button: FC<IButtonProps> = ({children, className, onClick, type}) => {
    return (
        <button
            className={className? `button ${className}` : 'button'}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;