//@ts-ignore
import React, {FC, MouseEventHandler, useEffect, useState} from 'react';
import Tooltip from "../../Tooltip/Tooltip.tsx";

export interface ITabs {
    children: any
    toolTipBox? : string
    className? : string
    onClick? : () => void
}

const Tabs: FC<ITabs> = ({children, className, onClick, toolTipBox}) => {

    const [activeTabCollection, setActiveTab] = useState<HTMLCollectionOf<Element> | null>(null)

    const onTabClick = (event: React.MouseEvent<HTMLDivElement>): void => {
        onClick?.()


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
            setActiveTab(document.getElementsByClassName('is-active tabs'))
        }, [className]
    )

    if (toolTipBox) {
        return (
            <div className='tabs-wrapper'>
                <button
                    className={className? className + ' tabs' : 'tabs'}
                    onClick={event => onTabClick(event)}
                >
                    {children}
                </button>
                <Tooltip children={toolTipBox}/>
            </div>
        )
    }

    return (
        <button
            className={className? className + ' tabs' : 'tabs'}
            onClick={event => onTabClick(event)}
        >
            {children}
        </button>
    );
};

export default Tabs;