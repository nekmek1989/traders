import React, {useEffect, useRef} from 'react';

type IDropDown = {
    children: any
    className?: string
}

const DropDown = (props: IDropDown): React.ReactNode => {
    const {children, className} = props
    const dropDownElement = useRef<HTMLDivElement | null>(null)

    const positionDropDown = () => {
        if (window.innerWidth < 480) {
            const { current } = dropDownElement
            const x = current?.getBoundingClientRect().x

            if(x && current) {
                if (x < 0) {
                    current.style.setProperty('--left', '-100px')
                }
            }
        }
    }

    window.addEventListener('resize', () => {
        positionDropDown()
    });
    useEffect(() => {
        positionDropDown()
    }, []);
    return (
        <div className={className? className + ' dropDown': 'dropDown'} ref={dropDownElement}>
            {children}
        </div>
    );
};

export default DropDown;