import React from 'react';

interface ToastProps {
  message: string | null;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white py-2 px-4 rounded-md z-50">
      {message}
    </div>
  );
};

export default Toast;
