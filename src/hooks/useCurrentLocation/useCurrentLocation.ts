import {useLocation} from "react-router";
import {useEffect, useState} from "react";

export const useCurrentLocation: hookCurrentLocation = () => {
    const {pathname} = useLocation()
    const [currentLocation, setCurrentLocation] = useState<string>('')

    useEffect(
        () => {
            setCurrentLocation(pathname)
        }, [pathname]
    )
    return currentLocation
}