//@ts-ignore
import React, {FC} from 'react';


export interface IInput {
    placeholder?: string
    type: string
    onChange: () => void
    onBlur: () => void
    name: string
    ref: any
    className?: string
}

const Input :FC<IInput> = ({type, className, placeholder, name, ref, onBlur, onChange}) => {
    return (
        <input
            placeholder={placeholder}
            type={type}
            name={name}
            ref={ref}
            onBlur={onBlur}
            onChange={onChange}
            className={className? className + ' input' : 'input'}
        />
    );
};

export default Input;