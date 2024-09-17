import React from 'react';

interface FileSizeAlertModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FileSizeAlertModal: React.FC<FileSizeAlertModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[40%]">
                <h2 className="text-xl font-bold text-center text-cyan-900 mb-8">File Size Alert</h2>
                <p className="mt-2 text-center text-md mb-8">The selected file is greater than 10MB. Please choose another file.</p>
                <div className="flex justify-center">
                    <button
                        className="bg-yellow-600 text-white font-bold rounded-lg px-4 py-2 w-28"
                        onClick={onClose}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileSizeAlertModal;
