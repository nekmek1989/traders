import React from 'react';
import {InputProps} from "./types";

const Input = (props: InputProps): React.ReactNode => {
    const {type, className, placeholder, name, ref, onBlur, onChange, disabled, defaultValue, uploadFile} = props

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
            className={className + ' input' + upload}
            id={name}
        />
    );
};

export default Input;