'use client';

import React, { useState } from 'react';

interface DealCardProps {
  image: string;
  title: string;
  rating: number;
  description: string[];
  price: string;
  onAccept: () => void;
  onEditOffer: (newPrice: string) => void; // Updated to take new price
  onDeclineAndSendMessage: () => void;
}

const DealCard: React.FC<DealCardProps> = ({
  image,
  title,
  rating,
  description,
  price,
  onAccept,
  onEditOffer,
  onDeclineAndSendMessage,
}) => {
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newPrice, setNewPrice] = useState('');

  const handleAccept = () => {
    setShowAcceptModal(true);
  };

  const handleCloseAcceptModal = () => {
    setShowAcceptModal(false);
  };

  const handleEditOffer = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditOfferSubmit = () => {
    onEditOffer(newPrice);
    setShowEditModal(false);
  };

  return (
    <>
      <div className="shadow-md rounded-md p-3 mb-4 w-60 flex-shrink-0" style={{ backgroundColor: '#CFEDF4' }}>
        <div className="flex items-center mb-2">
          <img className="w-6 h-6 rounded-full mr-2" src={image} alt={title} />
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="ml-2 text-orange-500">
            {'★'.repeat(Math.floor(rating))}{rating % 1 !== 0 && '★'}
          </div>
        </div>
        <ul className="text-gray-700 mb-4 text-sm">
          {description.map((desc, index) => (
            <li key={index} className="mb-1 flex items-start">
              <span className="mr-2">•</span>
              <span>{desc}</span>
            </li>
          ))}
        </ul>
        <p className="text-gray-700 mb-4 text-sm">{price}</p>
        <div className="flex space-x-2 justify-center">
          <button
            className="p-2 rounded-lg text-xs font-semibold hover:bg-[#D0693B]"
            style={{ backgroundColor: '#0B2147', color: 'white' }}
            onClick={handleAccept}
          >
            Accept
          </button>
          <button
            className="p-2 rounded-lg text-xs font-semibold hover:bg-[#D0693B]"
            style={{ backgroundColor: '#0B2147', color: 'white' }}
            onClick={handleEditOffer}
          >
            Edit Offer
          </button>
          <button
            className="p-2 rounded-lg text-xs font-semibold hover:bg-[#D0693B]"
            style={{ backgroundColor: '#0B2147', color: 'white' }}
            onClick={onDeclineAndSendMessage}
          >
            Decline
          </button>
        </div>
      </div>

      {/* Accept Modal */}
      {showAcceptModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Proceed to Payment</h2>
            <p className="mb-4">Are you sure you want to proceed to payment?</p>
            <div className="flex space-x-2">
              <a
                href="/payment"
                className="px-4 py-2 bg-[#0C2348] text-white rounded-lg font-semibold hover:bg-[#D0693B]"
              >
                Proceed to Payment
              </a>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600"
                onClick={handleCloseAcceptModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Offer Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Offer</h2>
            <p className="mb-4">Enter your new suggested price:</p>
            <input
              type="text"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-md"
            />
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 bg-[#0C2348] text-white rounded-lg font-semibold hover:bg-[#D0693B]"
                onClick={handleEditOfferSubmit}
              >
                Submit
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600"
                onClick={handleCloseEditModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DealCard;

