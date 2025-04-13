import React from 'react';
import {InputProps} from "./types";

const Input = (props: InputProps): React.ReactNode => {
    const {type, className, placeholder, name, ref, onBlur, onChange, errors, disabled, defaultValue, uploadFile} = props

    const upload = uploadFile ? ' input_upload-file' : ''
    const isInvalid = errors ? ' input_invalid' : ''
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
            className={className + ' input' + upload + isInvalid}
            id={name}
        />
    );
};

export default Input;