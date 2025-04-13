import { useEffect, useState } from "react";

const useWindowHeight = () => {
    const [height, setWidth] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerHeight);

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return height;
};

export default useWindowHeight;