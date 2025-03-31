//@ts-ignore
import React, {FC} from 'react';
import DropDown from "../DropDown/DropDown.tsx";

interface ITooltip {
    children : string
}

const Tooltip :FC<ITooltip> = ({children}) => {
    return (
        <div className='tooltip '>
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