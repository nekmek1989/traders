import React, {SyntheticEvent} from 'react';

type Select = {
    className: string
    options: string[]
    name: string
    ref: React.Ref<any>
    onClick?: (e: SyntheticEvent) => void
    onBlur: (e: SyntheticEvent) => void
}

const Select = (props: Select) => {
    const { className, options, name, ref, onClick, onBlur } = props
    return (
        <div className={'select-wrapper'}>
        <select
            className={className + ' select'}
            name={name}
            ref={ref}
            onClick={onClick}
            onBlur={onBlur}
            defaultValue="---"
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