import {useEffect, useState} from 'react';
import {createPortal} from "react-dom";
import {PortalProps} from "./types";

const Portal = (props: PortalProps) => {
    const {id, children} = props
    const [container, setContainer] = useState<HTMLElement>();

    useEffect(() => {
        if (id) {
            const portalContainer = document.getElementById(id)

            if (!portalContainer) {
                throw new Error('Error')
            }

            setContainer(portalContainer)
        }
    }, [id]);
    return container ? createPortal(children, container) : null
};

export default Portal;




type containerOptions = { id: string; mountNode?: HTMLElement };

export const createContainer = (options : containerOptions) => {
    if (document.getElementById(options.id)) {
        return;
    }

    const { id, mountNode = document.body } = options;

    const portalContainer = document.createElement('div');

    portalContainer.setAttribute('id', id);
    mountNode.appendChild(portalContainer);
};