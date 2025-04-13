import React from "react";

export type TabsProps = {
    children: any
    toolTipBox? : string
    className? : string | ''
    onClick?: React.MouseEventHandler<HTMLElement>;
    value: string
}