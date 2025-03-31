import React, {FC} from 'react';

interface IDropDown {
    children: any
    className?: string
}

const DropDown: FC<IDropDown> = ({children, className}) => {
    return (
        <div className={className? className + ' dropDown': 'dropDown'}>
            {children}
        </div>
    );
};

export default DropDown;