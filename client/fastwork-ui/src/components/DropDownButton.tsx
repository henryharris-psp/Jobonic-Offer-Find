import React, { useMemo, useState } from "react";
import CaretDownIcon from "../../public/icons/CaretDownIcon";

interface Option {
    value: string;
    label: string;
}

interface DropDownButtonProps {
    value?: any;
    options: Option[];
    onChange: (value: Option) => void;
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

    return (
        <li
            className="p-2 hover:bg-white hover:text-[#35617C] overflow-hidden hover:overflow-visible rounded-md relative"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <button className="flex items-center space-x-2">
                <p>{ selectedOption?.label }</p>
                <CaretDownIcon className={`w-4 h-4 transition-transform ${
                    isHover ? 'rotate-180 text-black' : 'text-white'
                }`}/>
            </button>
            {isHover && (
                <ul className="text-black absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    {options.map( option => (
                        <li
                            key={option.value}
                            className="p-2 hover:bg-gray-100 hover:rounded-t-md cursor-pointer"
                            onClick={() => onChange(option)}
                        >
                            <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                {option.label}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default DropDownButton;
