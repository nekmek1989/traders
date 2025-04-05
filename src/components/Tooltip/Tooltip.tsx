//@ts-ignore
import React, {FC} from 'react';
import DropDown from "../DropDown/DropDown.tsx";

interface ITooltip {
    children : string
    className?: string
}

const Tooltip :FC<ITooltip> = ({children, className}) => {
    return (
        <div className={'tooltip ' + className}>
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