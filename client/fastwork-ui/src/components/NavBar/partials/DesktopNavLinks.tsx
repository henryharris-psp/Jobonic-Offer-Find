"use client";

import { useEffect, useState } from "react";
import DropDownButton, { DropDownButtonOption } from "@/components/DropDownButton";
import { availableLanguages, pageLinks } from "@/data/nav-bar";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { PageLink } from "@/types/general";

const DesktopNavLinks = () => {
    const currentPathName = usePathname();
    const router = useRouter();
    const [language, setLanguage] = useState({}); 

    // Methods
    const isActiveLink = (page: PageLink) => {
        return page.path === currentPathName;
    };

    useEffect(() => {
        const getLocalLanguage = localStorage.getItem('lang') || 'en';
        setLanguage(getLocalLanguage);
    });

    const handleOnAppLanguageChange = (option: DropDownButtonOption) => {
        localStorage.setItem('lang', option.code);
        document.cookie = `lang=${option.code}; path=/`;
        setLanguage(option.code);
        
        router.refresh();
    };

    return (
        // Desktop nav links
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
                    value={language}
                    options={availableLanguages.map(({ label, code }) => ({
                        value: label,
                        label: label,
                        code: code
                    }))}
                    onChange={handleOnAppLanguageChange}
                />
            </ul>
        </div>
    );
};

export default DesktopNavLinks;
