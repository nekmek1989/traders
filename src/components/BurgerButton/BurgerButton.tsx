import React from 'react';

const BurgerButton = (props: BurgerButtonProps): React.ReactNode => {
    const {onClick, className} = props

    const buttonClick = (): void => {
        if (onClick) {
            onClick()
        }
    }

    return (
        <button
            className={`burger-button ${className}`}
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