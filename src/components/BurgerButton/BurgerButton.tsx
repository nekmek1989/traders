//@ts-ignore
import React, {FC} from 'react';

interface IBurgerButtonProps {
    className?: string
    onClick?: void
}

const BurgerButton: FC<IBurgerButtonProps> = ({onClick, className}) => {
    return (
        <button
            className={'visible-tablet burger-button ' + className}
            onClick={() => onClick()}
        >
            <div className='burger-button__inner'>
                <span className='burger-button__line'></span>
                <span className='burger-button__line'></span>
                <span className='burger-button__line'></span>
            </div>
        </button>
    );
};

export default BurgerButton;