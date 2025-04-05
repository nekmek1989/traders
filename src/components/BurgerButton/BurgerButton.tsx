//@ts-ignore
import React, {FC} from 'react';

interface IBurgerButtonProps {
    className?: string
    onClick?: () => void
}

const BurgerButton: FC<IBurgerButtonProps> = ({onClick, className}) => {

    const buttonClick = (): void => {
        if (onClick) {
            onClick()
        }
    }
    return (
        <button
            className={'burger-button ' + className}
            onClick={() => buttonClick()}
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