"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarComponent from "../components/NavBar";
import Footer from "../components/footer";
import ChatBox from "../components/ChatBox";
import store from "@/store";
import { Provider } from "react-redux";
import useWindowResize from "@/hooks/useWindowResize";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    useWindowResize();

    return (
        <html lang="en">
            <body className={inter.className}>
                <NavbarComponent />
                <main>{children}</main>
                <Footer />
                {/* <ChatBox /> */}
            </body>
        </html>
    );
}

const RootLayoutWithRedux = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <Provider store={store}>
            <RootLayout>
                {children}
            </RootLayout>
        </Provider>
    )
}

export default RootLayoutWithRedux;