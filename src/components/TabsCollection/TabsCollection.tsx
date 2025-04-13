import React from 'react';
import Tab from "./Tabs/Tab.tsx";
import {tabsCollectionProps} from "./types";

const TabsCollection = (props: tabsCollectionProps): React.ReactNode => {
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