"use client";
import { Inter } from "next/font/google";
import store from "@/store";
import { Provider, useDispatch } from "react-redux";
import useWindowResize from "@/hooks/useWindowResize";
import NavBar from "@/components/NavBar";
import { useEffect } from "react";
import { authenticate as reduxAuthenticate } from "@/store/reducers/authReducer";
import { getAuthUserDetails, getProfileByUserId } from "@/functions/helperFunctions";
import { usePathname } from "next/navigation";
import AdminRoot from "@/components/admin/AdminRoot";
import Notifications from "@/components/Notifications";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
    children: React.ReactNode;
    showFooter?: boolean;
    messages: Record<string, string>;
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
    messages,
}: Readonly<RootLayoutProps>) => {
    const [locale, setLocale] = useState('en'); // Default to 'en'

    useWindowResize();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const isAdminRoute = pathname.includes('admin');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedLocale = localStorage.getItem('locale') || 'en';
            setLocale(storedLocale);
        }
    }, []);

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
        <html lang={locale}>
            <script
                src="https://accounts.google.com/gsi/client"
                async
                defer
            ></script>
            <body className={inter.className}>

                {/* TODO: temporary, just to load colors */}
                <div className="hidden">
                    <div className=""/>
                    <div className="text-[#0B2147] bg-[#0B2147] hidden"/>
                    <div className="text-[#B0B0B0] bg-[#B0B0B0] hidden"/>
                    <div className="text-[#5A9E4A] bg-[#5A9E4A] hidden"/>
                    <div className="text-[#D0693B] bg-[#D0693B] hidden"/>
                    <div className="text-[#DD4A4A] bg-[#DD4A4A] hidden"/>
                    <div className="text-[#71BAC7] bg-[#71BAC7] hidden"/>
                </div>

                <NavBar />
                <Notifications/>
                <main>
                    { isAdminRoute ? (
                        <AdminRoot>
                            { children }
                        </AdminRoot>
                    ) : (
                        children
                    )}
                </main>
                {/* {showFooter && <Footer />} */}
                {/* <ChatBox /> */}
            </body>
        </html>
    );
};

const RootLayoutWithRedux = ({
    children,
    showFooter =true,
    messages,
}: Readonly<RootLayoutProps>) => {
    
    const [locale, setLocale] = useState('en'); // Default to 'en'

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Now safe to access localStorage
            const storedLocale = localStorage.getItem('locale') || 'en';
            setLocale(storedLocale);
        }
    }, []);

    return (
        <Provider store={store}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <RootLayout messages={messages} showFooter={showFooter}>
                    {children}
                </RootLayout>
            </NextIntlClientProvider>
        </Provider>
    );
};

export default RootLayoutWithRedux;
