import React from 'react';

interface SuccessModalProps {
  message: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg flex items-center">
      <span className="mr-4">{message}</span>
      <button onClick={onClose} className="bg-green-700 px-2 py-1 rounded">
        Close
      </button>
    </div>
  );
};

export default SuccessModal;

