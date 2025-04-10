//@ts-ignore
import React, {FC} from 'react';
import Tab, {ITabs} from "./Tabs/Tab.tsx";

interface ITabsCollection {
    tabs: ITabs[]
    className: string
    alt?: boolean
}

const TabsCollection :FC<ITabsCollection> = ({tabs, className, alt}) => {
    const isTabAlt = alt ? 'tab_alt' : ''
    return (
        <div className={`tabs-collection ${className}`}>
            {tabs.map(tab =>
                <Tab
                    children={tab.children}
                    toolTipBox={tab.toolTipBox}
                    className={`${tab.className} ${isTabAlt}`}
                    onClick={tab.onClick}
                    key={tab.children}
                />
            )}
        </div>
    );
};

export default TabsCollection;