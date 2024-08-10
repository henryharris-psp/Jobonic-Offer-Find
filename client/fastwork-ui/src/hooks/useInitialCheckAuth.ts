import { useDispatch } from "react-redux";

const useInitialCheckAuth = () => {
    const dispatch = useDispatch();

    const initialCheckAuth = async (accessToken, refreshToken) => {
        
    }

    return initialCheckAuth;
}

export default useInitialCheckAuth