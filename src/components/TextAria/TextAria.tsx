import React from 'react';
import {Props} from "./types";

const TextAria = (props: Props): React.ReactNode => {
    const {placeholder, onChange, onBlur, name, ref, className } = props
    return (
        <textarea
            className={`text-aria ${className}`}
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