import {SyntheticEvent} from "react";

export type InputProps =  {
    placeholder?: string
    type: string
    onChange: (e: SyntheticEvent) => void
    onBlur: (e: SyntheticEvent) => void
    name: string
    ref: any
    errors: object | undefined
    defaultValue?: string | number
    disabled?: boolean
    className?: string
    uploadFile?: boolean
}