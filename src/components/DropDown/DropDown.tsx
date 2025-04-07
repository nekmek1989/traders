import React from 'react';

type IDropDown = {
    children: any
    className?: string
}

const DropDown = (props: IDropDown): React.ReactNode => {
    const {children, className} = props

    return (
        <div className={className? className + ' dropDown': 'dropDown'}>
            {children}
        </div>
    );
};

export default DropDown;