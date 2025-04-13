import React from 'react';
import {Props} from "./types";

const TextAria = (props: Props): React.ReactNode => {
    const {placeholder, onChange, onBlur, name, ref, errors, className } = props
    const isInvalid = errors ? ' text-aria_invalid' : ''
    return (
        <textarea
            className={`text-aria ${className} ${isInvalid}`}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            ref={ref}
            id={name}
        />

    );
};

export default TextAria;