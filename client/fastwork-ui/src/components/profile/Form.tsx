"use client";
import React, { useState, useEffect } from 'react';
import httpClient from '@/client/httpClient';
import { useSelector } from "react-redux";
import { RootState } from '@/store';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const FinancialForm = () => {
  const { authUser } = useSelector((state: RootState) => state.auth);

  const [financialData, setFinancialData] = useState({
    cardNumber: '',
    cardExpiryDate: '',
    bankAccountNumber: '',
    walletAddress: '',
    cryptoType: '',
    paymentMethod: '', 
    receivePaymentMethod: '',
  });

  const [isEditable, setIsEditable] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ [key: string]: string }>({
    otherInfo: '',
  });

  const fetchFormData = async () => {
    const profileId = authUser?.profile?.id;

    if (!profileId) {
      console.error('User ID is undefined.');
      return;
    }

    try {
      const response = await httpClient.get(`/user?id=${authUser?.profile.id}`);
      const data = response.data;
      console.log('Filtered data : ', data);

      // Update the financial data state with the fetched data
      setFinancialData({
        cardNumber: data.cardNumber || '',
        cardExpiryDate: data.cardExpiryDate || '',
        bankAccountNumber: data.bankAccountNumber || '',
        walletAddress: data.walletAddress || '',
        cryptoType: data.cryptoType || '',
        paymentMethod: data.paymentMethod || 'CREDIT_CARD',
        receivePaymentMethod: data.receivePaymentMethod || 'CREDIT_CARD',
      });
    } catch (error) {
      console.error('Failed to fetch financial data:', error);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, [authUser?.profile.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFinancialData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const id = authUser?.profile?.id;
    if (!id) {
      console.error('User ID is undefined.');
      return;
    }
  
    try {
      const dataToSubmit = {
        ...financialData,
      };
      // Use PUT request to update an existing user by ID
      await httpClient.put(`/user?id=${authUser?.profile.id}`, dataToSubmit);  
  
      setFeedbackMessage({
        otherInfo: 'Form submitted successfully!',
      });
      setIsEditable(false);
      fetchFormData(); // Fetch updated data
    } catch (error) {
      console.error('Error submitting form:', error);
      setFeedbackMessage({
        otherInfo: 'Failed to submit form. Please try again.',
      });
    }
  };
  

  return (
    <div className="flex flex-col justify-start w-[60%] ml-16 pb-4">
      <div className="flex space-x-3 justify-start items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Financial Information</h2>
        <PencilSquareIcon
          className="w-6 h-6 cursor-pointer"
          onClick={() => setIsEditable(!isEditable)}
        />
      </div>

      {feedbackMessage["otherInfo"] && (
        <p className="text-sm mt-2 text-green-800">{feedbackMessage["otherInfo"]}</p>
      )}

      {isEditable ? (
        <form onSubmit={handleSubmit} className="flex flex-col justify-start min-w-full pb-4">
          {Object.keys(financialData).map((key) => (
            key !== 'paymentMethod' && key !== 'receivePaymentMethod' ? (
              <div className="mb-4" key={key}>
                <label className="block text-lg font-semibold mb-2" htmlFor={key}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
                <input
                  type={key === 'cardExpiryDate' ? 'date' : 'text'}
                  id={key}
                  placeholder={`Enter ${key}`}
                  className="block w-full p-3 text-gray-900 border rounded-lg bg-white text-base focus:ring-blue-500 focus:border-blue-500"
                  value={(financialData as any)[key]}
                  onChange={handleInputChange}
                />
              </div>
            ) : (
              <div className="mb-4" key={key}>
                <label className="block text-lg font-semibold mb-2" htmlFor={key}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
                <select
                  id={key}
                  value={(financialData as any)[key]}
                  className="block w-full p-3 text-gray-900 border rounded-lg bg-white text-base focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleInputChange}
                >
                  <option value="CREDIT_CARD">Credit Card</option>
                  <option value="CRYPTOCURRENCY">Cryptocurrency</option>
                </select>
              </div>
            )
          ))}

          <button
            type="submit"
            className="bg-[#0B2147] hover:bg-[#E1824F] text-white font-bold py-2 rounded-lg w-64 mt-4"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="p-4 border rounded-lg bg-white shadow-sm">
          {Object.entries(financialData).map(([key, value]) => (
            <p key={key} className="mb-2"><strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FinancialForm;
