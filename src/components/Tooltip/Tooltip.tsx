import React from 'react';
import DropDown from "../DropDown/DropDown.tsx";

const Tooltip = (props: Tooltip): React.ReactNode => {
    const {children, className} = props

    return (
        <div className={`tooltip ${className}`}>
            <div className='tooltip__header'>
                <p className='size-small'>?</p>
            </div>
            <DropDown className='tooltip__description'>
                {children}
            </DropDown>
        </div>
    );
};

export default Tooltip;