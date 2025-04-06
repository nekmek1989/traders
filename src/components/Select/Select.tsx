import React from 'react';

type Select = {
    className: string
    options: string[]
    value?: string
} & React.SelectHTMLAttributes<HTMLSelectElement>

const Select = (props: Select) => {
    const { className, options, value, ...rest } = props

    return (
        <div className={'select-wrapper'}>
        <select
            className={className + ' select'}
            defaultValue={value? value : '---'}
            {...rest}
        >
            <option disabled value={'---'}>---</option>
            {options.map((element: string)=>
                <option value={element} key={element}>
                    {element}
                </option>
            )}
        </select>
        </div>
    );
};

export default Select;