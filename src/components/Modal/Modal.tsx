import React, { useEffect, useRef, useState} from 'react';
import Portal, { createContainer } from '../Portal/Portal.tsx';
import BurgerButton from "../BurgerButton/BurgerButton.tsx";

const MODAL_CONTAINER_ID = 'modal-container-id';

type Props = { onClose?: () => void; children: React.ReactElement};

const Modal = (props: Props) => {
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
        } else if (onClose) {
            onClose()
        }
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