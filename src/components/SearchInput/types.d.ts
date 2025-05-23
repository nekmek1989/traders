import {SyntheticEvent} from "react";

export type SearchInputProps = {
    placeholder?: string
    type: string
    onChange: (e: SyntheticEvent) => void
    onBlur: (e: SyntheticEvent) => void
    name: string
    ref: any
    defaultValue?: string | number
    disabled?: boolean
    className?: string
    uploadFile?: boolean
}