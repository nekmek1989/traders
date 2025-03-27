//@ts-ignore
import React, {FC} from 'react';


export interface IInput {
    value?: string
    placeholder?: string
    onChange?: () => void
    type: string
    required? : boolean
    className?: string
    pattern?: string
}

const Input :FC<IInput> = ({required, type, className, onChange, placeholder, pattern, value}) => {
    return (
        <input
            value={value}
            placeholder={placeholder}
            required={required}
            type={type}
            className={className? className + ' input' : 'input'}
            onChange={onChange}
            pattern={pattern}
        />
    );
};

export default Input;