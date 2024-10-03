"use client";
import React, { useMemo, useState } from "react";
import CaretDownIcon from "../../public/icons/CaretDownIcon";

export interface DropDownButtonOption {
    value: string;
    label: string;
    code: string;
}

interface DropDownButtonProps {
    value?: any;
    options: DropDownButtonOption[];
    onChange: (value: DropDownButtonOption) => void;
}

const DropDownButton = ({
    options,
    value = options[0].value,
    onChange
}: DropDownButtonProps) => {
    const [isHover, setIsHover] = useState<boolean>(false);

    const selectedOption = useMemo( () => {
        return options.find( option => option.value === value );
    }, [value]);

    const language = localStorage.getItem('lang') || 'en';

    return (
        <div 
            className="relative"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <button className="flex items-center space-x-1 text-white p-2 rounded">
                <p>{ language === 'en' ? "English" : language === 'zh' ? "中文" : "ไทย" }</p>
                <CaretDownIcon className={`size-2 transition-transform ${
                    isHover ? '-rotate-180' : ''
                }`}/>
            </button>
            { isHover ? (
                <ul className="text-black absolute right-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 overflow-hidden">
                    {options.map( option => (
                        <li
                            key={option.value}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => onChange(option)}
                        >
                            <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                {option.label}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : ''}
        </div>
    );
};

export default DropDownButton;