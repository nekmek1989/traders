import React from "react";

export interface ITabs {
    children: any
    toolTipBox? : string
    className? : string | ''
    onClick?: React.MouseEventHandler<HTMLElement>;
    value: string
}