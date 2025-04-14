import React from 'react';
import {SearchInputProps} from "./types";
import Input from "../Input/Input.tsx";
import Search from '/src/assets/icons/Search.svg'

const SearchInput = (props: SearchInputProps): React.ReactNode => {
    const {type, className, placeholder, name, ref, onBlur, onChange, disabled, defaultValue, uploadFile} = props

    return (
        <label htmlFor={name} className={className + ' search-input-wrapper'}>
            <Input
                type={type}
                errors={undefined}
                className={'search-input'}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                name={name}
                ref={ref}
                disabled={disabled}
                defaultValue={defaultValue}
                uploadFile={uploadFile}
            />
            <img src={Search} className={'search-input__image'} alt={''}/>
        </label>
    );
};

export default SearchInput;