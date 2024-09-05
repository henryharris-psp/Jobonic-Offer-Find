"use client";
import { Inter } from "next/font/google";
import "./globals.css";
// import Footer from "../components/footer";
import store from "@/store";
import { Provider, useDispatch } from "react-redux";
import useWindowResize from "@/hooks/useWindowResize";
import NavBar from "@/components/NavBar";
import { useEffect } from "react";
import { authenticate as reduxAuthenticate } from "@/store/reducers/authReducer";
import { getAuthUserDetails, getProfileByUserId } from "@/functions/helperFunctions";
import Button from "@/components/Button";
// import initialiseCategories from "@/utils/initialiseCategories";
// import initializeSkills from "@/utils/initialiseSkills";
// import ChatBox from "../components/ChatBox";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
    children: React.ReactNode;
    showFooter?: boolean;
}

const authenticate = async (accessToken: string, refreshToken: string) => {
    const authUserDetails = await getAuthUserDetails(accessToken);

    if (!authUserDetails) {
        throw new Error('Authentication failed');
    }

    const authUserProfile = await getProfileByUserId(authUserDetails?.id, accessToken);

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
}: Readonly<RootLayoutProps>) => {

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

            // initialiseCategories();
            // initializeSkills();
        })();
    }, []);

    return (
        <html lang="en">
            <script
                src="https://accounts.google.com/gsi/client"
                async
                defer
            ></script>
            <body className={inter.className}>

                {/* TODO: temporary, just to load colors */}
                <div className="hidden">DD4A4A
                    <div className="bg-[#0B2147] hidden"/>
                    <div className="bg-[#B0B0B0] hidden"/>
                    <div className="bg-[#5A9E4A] hidden"/>
                    <div className="bg-[#D0693B] hidden"/>
                    <div className="bg-[#DD4A4A] hidden"/>
                    <div className="bg-[#71BAC7] hidden"/>
                </div>

                <NavBar />
                <main>{children}</main>
                {/* {showFooter && <Footer />} */}
                {/* <ChatBox /> */}
            </body>
        </html>
    );
};

const RootLayoutWithRedux = ({
    children,
    showFooter =true,
}: Readonly<RootLayoutProps>) => {
    return (
        <Provider store={store}>
            <RootLayout showFooter={showFooter}>{children}</RootLayout>
        </Provider>
    );
};

export default RootLayoutWithRedux;
