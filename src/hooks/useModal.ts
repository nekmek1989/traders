import {useState} from "react";
import {lockHTMLElement, unlockHTMLElement} from "../utils/htmlState.ts";

export const useModal =
    (): [isModal: boolean, openModal: () => void, closeModal: () => void] => {
        const [isModal, setIsModal] = useState<boolean>(false)

        const openModal = () => {
            lockHTMLElement()
            setIsModal(true)
        }

        const closeModal = () => {
            unlockHTMLElement()
            setIsModal(false)
        }

        return [isModal, openModal, closeModal]
    }