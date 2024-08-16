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
import { parseCSVFile } from "@/utils/parseCSVFile";
import { useEffect } from "react";
import { authenticate } from "@/store/reducers/authReducer";
import { getUserId } from "@/functions/helperFunctions";
import initialiseCategories from "@/utils/initialiseCategories";
import { AuthContextProvider } from "@/app/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

const dummyProfile = {
    name: "John Doe",
    email: "user@gmail.com",
    services: [
        "Web Development",
        "App Development",
        "UI/UX Design",
        "SEO Optimization",
    ],
    description:
        "Experienced full-stack developer with a passion for creating modern and responsive web applications. Skilled in both front-end and back-end technologies.",
    skills: [
        "JavaScript",
        "React",
        "Node.js",
        "PHP",
        "Laravel",
        "TailwindCSS",
        "MySQL",
        "HTML/CSS",
    ],
    experience: [
        "3 years as a Front-End Developer at TechCorp",
        "2 years as a Full-Stack Developer at CodeMasters",
        "1 year as a Freelance Web Developer",
    ],
    education: [
        "Bachelor's in Computer Science from State University",
        "Certified JavaScript Developer",
    ],
    otherInformation: [
        "Fluent in English and Spanish",
        "Enjoys contributing to open-source projects",
        "Active member of local developer community",
    ],
    rating: 4.7,
};

// Load and initialize skills from CSV file. To be removed for production.
const fetchAndInitializeSkills = async () => {
    try {
        const response = await fetch("/skillList.csv");
        const blob = await response.blob();
        const file = new File([blob], "skills.csv");
        const skills = await parseCSVFile(file);
        await initializeSkills(skills);
    } catch (error) {
        console.error("Error initializing skills:", error);
    }
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    useWindowResize();
    const dispatch = useDispatch();

    //initial auth check on page load
    useEffect(() => {
        //temporary login
        const urlParams = new URLSearchParams(window.location.search);
        const refreshToken = urlParams.get("refresh_token");
        const accessToken = urlParams.get("access_token");

        if (accessToken && refreshToken) {
            // Use access token for API calls in PMS
            localStorage.setItem("refresh_token", refreshToken);
            localStorage.setItem("access_token", accessToken);
            window.location.href = "/";
        } else {
            //temporary
            (async () => {
                try {
                    const userId = await getUserId();
                    dispatch(authenticate({
                        id: userId,
                        ...dummyProfile
                    }));
                } catch (error) {
                    console.log("Session Expired", error);
                }
            })();
        }

        // Initialize categories on app start. To be removed for production.
        initialiseCategories();
        fetchAndInitializeSkills();
    }, []);

    return (
        <html lang="en">
            <AuthContextProvider>
                <script src="https://accounts.google.com/gsi/client" async defer></script>
                <body className={inter.className}>
                    <NavBar />
                    <main>{children}</main>
                    <Footer />
                    {/* <ChatBox /> */}
                </body>
            </AuthContextProvider>
        </html>
    );
};

const RootLayoutWithRedux = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <Provider store={store}>
            <RootLayout>{children}</RootLayout>
        </Provider>
    );
};

export default RootLayoutWithRedux;
