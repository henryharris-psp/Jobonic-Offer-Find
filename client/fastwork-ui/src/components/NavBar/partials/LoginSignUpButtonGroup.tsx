import Link from "next/link";
import React from "react";
import {useRouter} from "next/navigation";

const LoginSignUpButtonGroup = () => {

    const router = useRouter();
    //methods
        const handleLogIn = () => {
            const laconicAuthPageUrl = process.env.NEXT_PUBLIC_LACONIC_AUTH_PAGE_URL;
            window.location.href = `${laconicAuthPageUrl}/authentication?page=logout`;
            // dispatch(login());
            //router.push("/login");
        }

    return (
        <div className="flex space-x-2">
            <button
                type="button"
                className="text-white whitespace-nowrap bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-1"
                onClick={handleLogIn}
            >
                Log In
            </button>
            <button
                type="button"
                className="text-white whitespace-nowrap bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-1"
            >
                <Link href="/register">Sign Up</Link>
            </button>
        </div>
    );
};

export default LoginSignUpButtonGroup;
