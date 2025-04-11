//@ts-ignore
import React, {FC, MouseEventHandler, useEffect, useState} from 'react';
import Tooltip from "../../Tooltip/Tooltip.tsx";
import {ITabs} from "./types";



const Tab = (props: ITabs): React.ReactNode => {

    const {children, className, onClick, toolTipBox, value} = props
    const [activeTabCollection, setActiveTab] = useState<HTMLCollectionOf<Element> | null>(null)

    const onTabClick = (event: React.MouseEvent<HTMLElement>): void => {
        onClick?.(event)

        const target = event.target as HTMLElement;
        const parent = target.closest('.tabs-collection') as HTMLElement | null;

        if (activeTabCollection) {
            Array.from(activeTabCollection).forEach(activeTab => {
                if (activeTab.closest('.tabs-collection') === parent) {
                    activeTab.classList.remove('is-active')
                }
            });
        }

        target.classList.add('is-active')
    }


    useEffect(
        () => {
            setActiveTab(document.getElementsByClassName('is-active tab'))
        }, [className]
    )

    if (toolTipBox) {
        return (
            <div className='tab-wrapper'>
                <button
                    className={`tab ${className}`}
                    onClick={event  => onTabClick(event)}
                    value={value}
                >
                    {children}
                </button>
                <Tooltip children={toolTipBox}/>
            </div>
        )
    }

    return (
        <button
            className={`tab ${className}`}
            onClick={event => onTabClick(event)}
            value={value}
        >
            {children}
        </button>
    );
};

export default Tab;