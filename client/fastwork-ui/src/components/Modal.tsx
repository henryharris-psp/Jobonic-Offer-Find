"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ 
  isOpen, 
  onClose, 
  children 
}: ModalProps ) => {
    if (!isOpen) return null;

    return (
        <div className="flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-40 z-50">
            <div className="relative m-5 sm:m-10">
                <button
                    className="absolute -top-3 -right-3 bg-gray-500 hover:bg-gray-400 p-1 rounded-full border border-white"
                    onClick={onClose}
                >
                    <XMarkIcon className="size-5 text-white" />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
