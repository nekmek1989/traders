import React, {useEffect, useRef, useState} from 'react';
import DropDown from "../DropDown/DropDown.tsx";

interface IDropDown {
    children: React.ReactNode
    elements: React.ReactNode
    className?: string
}

const IconDropDownButton = (props: IDropDown): React.ReactNode => {
    const {children, className, elements} = props

    const [classes, setClasses] = useState<string>('icon-drop-down-button__description')
    const menuRef = useRef<HTMLDivElement | null>(null)

    const showDescription = ():void => {
        if (!classes.includes('is-active')) setClasses(classes + ' is-active')
    }


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setClasses('icon-drop-down-button__description');
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);


    return (
        <div
            className={className? className +' icon-drop-down-button' : 'icon-drop-down-button'}
            onClick={showDescription}
            ref={menuRef}
        >
            {children}
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5" fill="none">
                <path d="M4 5L7.4641 1.25H0.535898L4 5Z" fill="white"/>
            </svg>
            <DropDown children={elements} className={classes}/>
        </div>
    );
};

export default IconDropDownButton;