import React from 'react';

type Select = {
    className: string
    options: string[]
    value?: string
    alt?: boolean
} & React.SelectHTMLAttributes<HTMLSelectElement>

const Select = (props: Select): React.ReactNode => {
    const { className, options, value, alt, ...rest } = props

    return (
        <div className={className + ' select-wrapper'}>
            <select
                className={alt ? ' select select__alt' : 'select'}
                defaultValue={value? value : '---'}
                {...rest}
            >
                <option disabled value={value? value : '---'}>{value? value : '---'}</option>
                {options.map((element: string)=>
                    <option value={element} key={element}>
                        {element}
                    </option>
                )}
            </select>

            <img
                src={"/src/assets/icons/Arrow.png"}
                className={'select__image'}
                alt={''}
            />
        </div>
    );
};

export default Select;