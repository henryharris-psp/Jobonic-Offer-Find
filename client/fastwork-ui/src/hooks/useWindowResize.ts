import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BreakPoint, setScreenSize } from "../store/reducers/uiReducer";

const useWindowResize = () => {
    const dispatch = useDispatch();

    useEffect( () => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;

            const breakpoints: { size: BreakPoint, value: number }[] = [
                { size: 'sm', value: 640 },
                { size: 'md', value: 768 },
                { size: 'lg', value: 1024 },
                { size: 'xl', value: 1280 }
            ];

            const matchBreakPoint = breakpoints.find( breakpoint => screenWidth < breakpoint.value );
            const currentScreenSize = matchBreakPoint ? matchBreakPoint.size : 'xl';

            dispatch(setScreenSize(currentScreenSize));
        }

        handleResize(); //initial resize

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return null;
}

export default useWindowResize;