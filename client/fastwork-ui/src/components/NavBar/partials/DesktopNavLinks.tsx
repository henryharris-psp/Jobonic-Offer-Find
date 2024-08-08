import DropDownButton from "@/components/DropDownButton";
import { availableLanguages, pageLinks } from "@/data/nav-bar";
import { RootState } from "@/store";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import AuthUserDetailsDropDownButton from "./AuthUserDetailsDropDownButton";
import { usePathname } from 'next/navigation';

interface NavLinksProps {
    registerForm: string | null;
    selectedLanguage: string;
    setSelectedLanguage: (value: string) => void,
}

const DesktopNavLinks = ({
    registerForm,
    selectedLanguage,
    setSelectedLanguage,
} : NavLinksProps ) => {
    const { authUser } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const currentPathName = usePathname();

    const handleLogIn = () => {
        // dispatch(login());
    }

    return (
        //desktop nav links
        <div className="flex items-center space-x-4 text-sm">
            <ul className="flex gap-x-4 text-white items-center font-medium">
                {pageLinks.map((page) => (
                    <li
                        key={page.id}
                        className={`p-2 hover:bg-[#0C2348] cursor-pointer hover:text-white rounded-md ${
                            page.path === currentPathName ? 'bg-white text-[#35617C]' : ''
                        }`}
                    >
                        <Link href={page.path}>
                            <p>{page.name}</p>
                        </Link>
                    </li>
                ))}

                <DropDownButton
                    value={selectedLanguage}
                    options={availableLanguages.map((language) => ({
                        label: language,
                        value: language,
                    }))}
                    onChange={(option) => setSelectedLanguage(option.value)}
                />

                { authUser ? (
                    //authenticated
                    registerForm === "jobonicRegister" ? (
                        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <button
                                type="button"
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2 mt-1"
                            >
                                <Link href="/register">Create Profile</Link>
                            </button>
                        </div>
                    ) : (
                        <AuthUserDetailsDropDownButton/>
                    )
                ) : (  
                    //unauthenticated
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button
                            type="button"
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2 mt-1"
                            onClick={handleLogIn}
                        >
                            Log In
                        </button>
                        <button
                            type="button"
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2 mt-1"
                        >
                            <Link href="/register">
                                Sign Up
                            </Link>
                        </button>
                    </div>
                )}                    
            </ul>
        </div>
    );
};

export default DesktopNavLinks;



