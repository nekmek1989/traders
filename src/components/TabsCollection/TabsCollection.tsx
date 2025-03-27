//@ts-ignore
import React, {FC} from 'react';
import Tabs, {ITabs} from "./Tabs/Tabs.tsx";

interface ITabsCollection {
    tabs: ITabs[]
}

const TabsCollection :FC<ITabsCollection> = ({tabs}) => {
    return (
        <div className='tabs-collection'>
            {tabs.map(tab =>
                <Tabs
                    children={tab.children}
                    toolTipBox={tab.toolTipBox}
                    className={tab.className}
                    onClick={tab.onClick}
                    key={tab.children}
                />
            )}
        </div>
    );
};

export default TabsCollection;