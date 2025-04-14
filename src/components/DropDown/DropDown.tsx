import React, {useEffect, useRef} from 'react';
import useWindowWidth from "../../hooks/useSize/useWindowWidth.ts";


const DropDown = (props: DropDownProps): React.ReactNode => {
    const {children, className} = props
    const dropDownElement = useRef<HTMLDivElement | null>(null)
    const size = useWindowWidth()

    const positionDropDown = () => {
        if (size < 480) {
            const { current } = dropDownElement
            const x = current?.getBoundingClientRect().x

            if(x && current) {
                if (x < 0) {
                    current.style.setProperty('--left', `${-190 + Math.log(-x) * 10 + 30}px`)
                }
            }
        }
    }

    useEffect(() => {
        positionDropDown()
    }, [size]);
    return (
        <div className={className? className + ' dropDown': 'dropDown'} ref={dropDownElement}>
            {children}
        </div>
    );
};

export default DropDown;