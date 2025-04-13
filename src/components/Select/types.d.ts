import React from "react";

type SelectProps = {
    className: string
    options: string[]
    value?: string
    alt?: boolean
} & React.SelectHTMLAttributes<HTMLSelectElement>