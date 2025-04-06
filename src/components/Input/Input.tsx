//@ts-ignore
import React, {FC, SyntheticEvent} from 'react';


export interface IInput {
    placeholder?: string
    type: string
    onChange: (e: SyntheticEvent) => void
    onBlur: (e: SyntheticEvent) => void
    name: string
    ref: any
    defaultValue?: string | number
    disabled?: boolean
    className?: string
    uploadFile?: boolean
    id?: string
}

const Input :FC<IInput> = ({type, className, placeholder, name, ref, onBlur, onChange, disabled, defaultValue, uploadFile, id}) => {

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
            defaultValue={defaultValue}
            className={className? className + ' input' + upload : ' input' + upload}
            id={id}
        />
    );
};

export default Input;