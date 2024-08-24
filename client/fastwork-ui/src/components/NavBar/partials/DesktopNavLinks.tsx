import DropDownButton, { DropDownButtonOption } from "@/components/DropDownButton";
import { availableLanguages, pageLinks } from "@/data/nav-bar";
import { RootState } from "@/store";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from 'next/navigation';
import { setSelectedLanguage } from "@/store/reducers/uiReducer";
import { Language } from "@/types/ui";
import { PageLink } from "@/types/general";

const DesktopNavLinks = () => {
    const currentPathName = usePathname();
    const dispatch = useDispatch();
    const { selectedLanguage } = useSelector((state: RootState) => state.ui);

    //methods
        const isActiveLink = (page: PageLink) => {
            return page.path === currentPathName    
        }

        const handleOnAppLanguageChange = (option: DropDownButtonOption) => {
            dispatch(setSelectedLanguage(option.value as Language));
        }

    return (
        //desktop nav links
        <div className="flex items-center space-x-4 text-sm">
            <ul className="flex space-x-3 text-white items-center font-medium">
                {pageLinks.map((page) => (
                    <Link
                        href={page.path}
                        key={page.id}
                        className={`p-2 text-center cursor-pointer rounded-md ${
                            isActiveLink(page) ? 'bg-white text-[#35617C]' : 'hover:bg-[#0C2348] hover:text-white'
                        }`}
                    >
                        <p>{page.name}</p>
                    </Link>
                ))}

                <DropDownButton
                    value={selectedLanguage}
                    options={availableLanguages.map((language) => ({
                        label: language,
                        value: language,
                    }))}
                    onChange={handleOnAppLanguageChange}
                />
            </ul>
        </div>
    );
};

export default DesktopNavLinks;