import React, {useEffect, useState} from 'react';
import Tooltip from "../../Tooltip/Tooltip.tsx";
import {TabsProps} from "./types";

const Tab = (props: TabsProps): React.ReactNode => {
    const {children, className, onClick, toolTipBox, value} = props

    const [activeTabCollection, setActiveTabCollection] = useState<HTMLCollectionOf<Element> | null>(null)

    const onTabClick = (event: React.MouseEvent<HTMLElement>) => {
        onClick?.(event)

        const target = event.target as HTMLElement;
        const parent = target.closest('.tabs-collection') as HTMLElement

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
            setActiveTabCollection(document.getElementsByClassName('is-active tab'))
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