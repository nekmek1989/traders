import {SyntheticEvent} from "react";

type Props =  {
    placeholder?: string
    onChange: (e: SyntheticEvent) => void
    onBlur: (e: SyntheticEvent) => void
    name: string
    ref: any
    errors: object | undefined
    className?: string
}