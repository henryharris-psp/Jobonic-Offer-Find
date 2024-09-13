interface PopupModalProps {
    onClose: () => void;
    children: React.ReactNode; // Accept children as props
  }
  
  const PopupModal = ({ onClose, children }: PopupModalProps) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-lg p-4 w-96">
          <button
            className="absolute top-2 right-2 text-gray-500"
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    );
  };
  