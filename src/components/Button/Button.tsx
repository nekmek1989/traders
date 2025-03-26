// @ts-ignore
import React, {FC} from 'react';


interface IButtonProps {
    children?: string
    onClick?: void
    className?: string
}

const Button: FC<IButtonProps> = ({children, className}) => {
    return (
        <button className={className? `button ${className}` : 'button'}>
            {children}
        </button>
    );
};

export default Button;