//@ts-ignore
import React, {FC} from 'react';
import {ITabs} from "./Tabs/types";
import Tab from "./Tabs/Tab.tsx";


interface ITabsCollection {
    tabs: ITabs[]
    className: string
    alt?: boolean
}

const TabsCollection = (props: ITabsCollection): React.ReactNode => {
    const {tabs, className, alt} = props
    const isTabAlt = alt ? 'tab_alt' : ''
    const isTabCollectionAlt = alt ? 'tabs-collection_alt' : ''
    return (
        <div className={`tabs-collection ${isTabCollectionAlt} ${className}`}>
            {tabs.map(tab =>
                <Tab
                    children={tab.children}
                    toolTipBox={tab.toolTipBox}
                    className={`${tab.className} ${isTabAlt}`}
                    onClick={tab.onClick}
                    key={tab.children}
                    value={tab.value}
                />
            )}
        </div>
    );
};

export default TabsCollection;