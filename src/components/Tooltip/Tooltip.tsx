//@ts-ignore
import React, {FC} from 'react';

interface ITooltip {
    children : string
}

const Tooltip :FC<ITooltip> = ({children}) => {
    return (
        <div className='tooltip'>
            <div className='tooltip__header'>
                <p className='size-small'>?</p>
            </div>
            <div className='tooltip__description'>
                {children}
            </div>
        </div>
    );
};

export default Tooltip;