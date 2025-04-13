import React, { useEffect, useRef, useState} from 'react';
import Portal, { createContainer } from '../Portal/Portal.tsx';
import BurgerButton from "../BurgerButton/BurgerButton.tsx";
import {ModalProps} from "./types";

const MODAL_CONTAINER_ID = 'modal-container-id';

const Modal = (props: ModalProps): React.ReactNode => {
    const { onClose, children } = props;

    const rootRef = useRef<HTMLDivElement>(null);
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        createContainer({ id: MODAL_CONTAINER_ID });
        setMounted(true);
    }, []);

    const handleClose = (event?: any) => {
        if (event) {
            if (event.target === rootRef.current || event.key === 'Escape') {
                onClose?.()
            }
        }
        onClose?.()
    }

    document.addEventListener('keydown', event => handleClose(event))

    return (
        isMounted
            ? (
                <Portal id={MODAL_CONTAINER_ID}>
                    <div
                        className={'modal'}
                        ref={rootRef}
                        onClick={event => handleClose(event)}
                    >
                        <div className={'modal__inner'}>
                            <BurgerButton
                                className={'is-active modal__button'}
                                onClick={handleClose}
                            />
                            {children}
                        </div>
                    </div>
                </Portal>
            )
            : null
    );
};

export default Modal;