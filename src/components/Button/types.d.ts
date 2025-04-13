import React from "react";

type ButtonProps = {
    children?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    className?: string
    type?: 'button' | 'submit' | 'reset' | undefined
    small?: boolean
    alt?: boolean
    smallest?: boolean
    deleteButton?: boolean
}