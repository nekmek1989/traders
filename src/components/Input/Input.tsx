//@ts-ignore
import React, {FC} from 'react';


export interface IInput {
    placeholder?: string
    type: string
    onChange: () => void
    onBlur: () => void
    name: string
    ref: any
    value: string
    disabled: boolean
    className?: string
    uploadFile?: boolean
}

const Input :FC<IInput> = ({type, className, placeholder, name, ref, onBlur, onChange, disabled, value, uploadFile}) => {

    const upload = uploadFile ? ' input__upload-file' : ''
    return (
        <input
            placeholder={placeholder}
            type={type}
            name={name}
            ref={ref}
            onBlur={onBlur}
            onChange={onChange}
            disabled={disabled}
            value={value}
            className={className? className + ' input' + upload : ' input' + upload}
        />
    );
};

export default Input;