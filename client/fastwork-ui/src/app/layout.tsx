"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/footer";
import ChatBox from "../components/ChatBox";
import store from "@/store";
import { Provider, useDispatch } from "react-redux";
import useWindowResize from "@/hooks/useWindowResize";
import NavBar from "@/components/NavBar";
import initializeSkills from "@/utils/initialiseSkills";
import { useEffect } from "react";
import { authenticate as reduxAuthenticate } from "@/store/reducers/authReducer";
import initialiseCategories from "@/utils/initialiseCategories";
<<<<<<< Updated upstream
import { AuthContextProvider } from "@/app/context/AuthContext";
import axios from "axios";
=======
import { AuthContextProvider } from "@/contexts/AuthContext";
>>>>>>> Stashed changes

const inter = Inter({ subsets: ["latin"] });

const getAuthUserDetails = async (token: string) => {
    const laconicAuthServerUrl =process.env.NEXT_PUBLIC_LACONIC_AUTH_SERVER_URL;
    try{
        const res = await axios.get(`${laconicAuthServerUrl}/user/init-data`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch {
        return null;
    }
}

const getAuthUserProfile = async (userId: string | number, token: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try{
        const res = await axios.get(`${apiUrl}/user/profile?id=${userId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch {
        return null;
    }
}

const authenticate = async (accessToken: string, refreshToken: string) => {
    const authUserDetails = await getAuthUserDetails(accessToken);

    if (!authUserDetails) {
        throw new Error('Authentication failed');
    }

    const authUserProfile = await getAuthUserProfile(authUserDetails?.id, accessToken);

    // Save working token
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);

    return {
        ...authUserDetails,
        profile: authUserProfile,
    };
};

const RootLayout = ({
    children,
    showFooter = true,
}: Readonly<{
    children: React.ReactNode;
    showFooter?: boolean;
}>) => {
    useWindowResize();
    const dispatch = useDispatch();

    //boot method
    useEffect(() => {
        (async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const newRefreshToken = urlParams.get("refresh_token");
            const newAccessToken = urlParams.get("access_token");
    
            if(newAccessToken && newRefreshToken){
                try{
                    await authenticate(newAccessToken, newRefreshToken);
                    window.location.href = '/';
                } catch {
                    console.log('cannot authenticate with new token');
                }
            } else {
                const storedAccessToken = localStorage.getItem('access_token');
                const storedRefreshToken = localStorage.getItem('refresh_token');

                if(storedAccessToken && storedRefreshToken){
                    try{
                        const authUser = await authenticate(storedAccessToken, storedRefreshToken);
                        dispatch(reduxAuthenticate(authUser));
                    } catch {
                        console.log('Token expired. Login Again');
                    }
                }
            }

            initialiseCategories();
            initializeSkills();
        })();
    }, []);

    return (
        <html lang="en">
            <AuthContextProvider>
                <script
                    src="https://accounts.google.com/gsi/client"
                    async
                    defer
                ></script>
                <body className={inter.className}>
                    <NavBar />
                    <main>{children}</main>
                    {showFooter && <Footer />}
                    {/* <ChatBox /> */}
                </body>
            </AuthContextProvider>
        </html>
    );
};

const RootLayoutWithRedux = ({
    children,
    showFooter =true,
}: Readonly<{
    children: React.ReactNode;
    showFooter?: boolean;
}>) => {
    return (
        <Provider store={store}>
            <RootLayout showFooter={showFooter}>{children}</RootLayout>
        </Provider>
    );
};

export default RootLayoutWithRedux;
