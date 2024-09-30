import { Sorting, SortingValue } from "@/types/Sorting";
import { BarsArrowDownIcon, CheckIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect, useRef } from "react";

interface SortingDropDownProps {
  selectedSorting: SortingValue;
  sortings: Sorting[];
  onChange: (sorting: SortingValue) => void;
}

const SortingDropDown = ({
  selectedSorting,
  sortings,
  onChange,
}: SortingDropDownProps) => {
  const [show, setShow] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // To detect outside clicks

  // Determine if the sorting option is currently selected
  const isSelected = (sortingValue: SortingValue) => {
    return (
      sortingValue.sortBy === selectedSorting.sortBy &&
      sortingValue.sortOrder === selectedSorting.sortOrder
    );
  };

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show]);

  // Toggle dropdown visibility
  const handleOnClickToggle = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button to toggle sorting dropdown */}
      <button
        className="flex items-center space-x-2 justify-center w-full text-white bg-[#0B2147] hover:bg-[#D0693B] rounded-lg py-2 px-4 text-sm"
        onClick={handleOnClickToggle}
      >
        <BarsArrowDownIcon className="size-5 text-white" />
        <span>Sort</span>
      </button>

      {/* Sorting dropdown list */}
      {show && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {sortings.map((sorting) => (
            <button
              key={sorting.value.sortBy || sorting.label} // Use label as fallback for unique key
              className="flex items-center w-full justify-between hover:bg-gray-50 active:bg-gray-200 py-2 px-3 border-b border-b-gray-200 last:border-0"
              onClick={() => {
                onChange(sorting.value); // Call onChange to update sorting
                setShow(false); // Close dropdown after selecting
              }}
            >
              <span
                className={`flex-1 text-start text-sm ${
                  isSelected(sorting.value) ? "font-bold" : ""
                }`}
              >
                {sorting.label}
              </span>
              {isSelected(sorting.value) && (
                <CheckIcon className="size-4 text-black" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortingDropDown;