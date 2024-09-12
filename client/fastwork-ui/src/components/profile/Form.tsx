"use client";
import React, { useState, useEffect } from 'react';
import httpClient from '@/client/httpClient';
import { useSelector } from "react-redux";
import { RootState } from '@/store';
import { BookmarkSquareIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

type FinancialData = {
  cardNumber: string;
  cardExpiryDate: string;
  bankAccountNumber: string;
  walletAddress: string;
  cryptoType: string;
  paymentMethod: string;
  receivePaymentMethod: string;
};

type FinancialFormFields = keyof FinancialData;

const FinancialForm = () => {
  const { authUser } = useSelector((state: RootState) => state.auth);

  const [financialList, setFinancialList] = useState<any[]>([]);
  const [formData, setFormData] = useState<FinancialData>({
    cardNumber: '',
    cardExpiryDate: '',
    bankAccountNumber: '',
    walletAddress: '',
    cryptoType: '',
    paymentMethod: 'CREDIT_CARD',
    receivePaymentMethod: 'CREDIT_CARD',
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState<number | null>(null);
  const [showNewEntry, setShowNewEntry] = useState(false);

  const resetForm = () => {
    setFormData({
      cardNumber: '',
      cardExpiryDate: '',
      bankAccountNumber: '',
      walletAddress: '',
      cryptoType: '',
      paymentMethod: 'CREDIT_CARD',
      receivePaymentMethod: 'CREDIT_CARD',
    });
    setFeedbackMessage('');
  };
  

  const fetchFinancialData = async () => {
    const profileId = authUser?.profile?.id;
    if (!profileId) {
      console.error('User ID is undefined.');
      return;
    }

    try {
      const response = await httpClient.get(`/user?id=${profileId}`);
      setFinancialList(response.data);
    } catch (error) {
      console.error('Failed to fetch financial data:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id as FinancialFormFields]: value,
    }));
  };

  useEffect(() => {
    if (authUser?.profile.id) {
      fetchFinancialData();
    }
  }, [authUser?.profile.id]);

  useEffect(() => {
    console.log('Updated otherInfo List : ', financialList);
  }, [financialList]);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.cardNumber || !formData.cardExpiryDate || !formData.bankAccountNumber || !formData.walletAddress) {
      setFeedbackMessage('Please fill in all fields.');
      return;
    }
    const newFinancialData = {
      profileId: authUser?.profile.id,
      ...formData,
    };

    try {
      if (editIndex !== null) {
        // Update existing financial entry
        const updatedFinancialData = { ...financialList[editIndex], ...newFinancialData };
        const response = await httpClient.put(`/user?id=${updatedFinancialData.id}`, updatedFinancialData);
        setFinancialList((prev) => {
          const updatedList = [...prev];
          updatedList[editIndex] = response.data;
          return updatedList;
        });
        setFeedbackMessage('Other information updated successfully!');
      } else {
        // Add new financial entry
        const response = await httpClient.put(`/user?id=${authUser?.profile.id}`, newFinancialData);
        setFinancialList((prev) => Array.isArray(prev) ? [...prev, response.data] : [response.data]); // Directly add new data to the state
        setFeedbackMessage('Other information saved successfully!');
      }

      setShowNewEntry(false);
      setEditIndex(null);
      resetForm();

    } catch (error) {
      console.error('Error saving financial data:', error);
      setFeedbackMessage('Failed to save financial information.');
    }
  };

  const handleRemoveClick = (index: number) => {
    setShowConfirmDelete(index);
  };

  const handleConfirmDelete = async () => {
    if (showConfirmDelete !== null) {
      const financialToDelete = financialList[showConfirmDelete];
      try {
        await httpClient.delete(`/user?id=${financialToDelete.id}`); // Changed endpoint to `user-financials`
        setFinancialList((prev) => prev.filter((_, i) => i !== showConfirmDelete));
        setFeedbackMessage('Financial information deleted successfully!');
      } catch (error) {
        console.error('Error deleting financial data:', error);
        setFeedbackMessage('Failed to delete financial information.');
      }
    }
    setShowConfirmDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(null);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setFormData(financialList[index]);
    setShowNewEntry(true);
  };

  return (
    <div className="flex flex-col justify-start w-[60%] ml-16 mt-4 pb-4">
      <div className="flex space-x-3 justify-start items-center animate-pulse mb-6">
        <h2 className="text-2xl font-bold text-cyan-950">Other Information</h2>
        <PencilSquareIcon
          className="w-6 h-6 cursor-pointer text-yellow-700"
          onClick={() => setShowNewEntry(!showNewEntry)}
        />
      </div>

      {feedbackMessage && (
        <p className="text-sm mt-2 text-green-800">{feedbackMessage}</p>
      )}

      {showNewEntry ? (
        <form onSubmit={handleSave} className="flex flex-col justify-start min-w-full rounded-lg p-6 bg-gray-100">
          {Object.keys(formData).map((field, index) => (
            <div key={index} className="grid grid-cols-3 items-center p-2">
              <h3 className="flex flex-col font-bold">
                {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h3>
              {field.includes('Method') ? (
                <select
                  id={field}
                  name={field}
                  value={formData[field as keyof FinancialData]}
                  onChange={handleInputChange}
                  className="text-black col-span-2 border-none p-2 bg-white rounded-lg"
                >
                  <option value="CREDIT_CARD">Credit Card</option>
                  <option value="CRYPTOCURRENCY">Cryptocurrency</option>
                </select>
              ) : (
                <input
                  type={field === 'cardExpiryDate' ? 'date' : 'text'}
                  id={field}
                  name={field}
                  value={formData[field as keyof FinancialData]}
                  onChange={handleInputChange}
                  placeholder={`Enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                  className="text-black col-span-2 border-none bg-white rounded-lg"
                />
              )}
            </div>
          ))}
          <button
            type="button" // Changed to "button" to prevent default form submission
            onClick={handleSave}
            className="bg-[#0B2147] hover:bg-[#E1824F] text-white font-bold py-2 rounded-lg mt-4 flex justify-center items-center w-28"
          >
            <BookmarkSquareIcon className="w-6 h-6 mr-2" />
            <span>Save</span>
          </button>
        </form>
      ) : (
        <div className="p-4 border rounded-lg bg-gray-100 shadow-sm">
          <ul className="list-disc pl-5 relative">
            {Array.isArray(financialList) && financialList.length > 0 ? (
              financialList.map((data, index) => (
                <li key={index} className="mb-2 flex justify-between items-center">
                  <div>
                    {/* Log each data item */}
                    {Object.entries(data)
                      .filter(([key]) =>
                        ['cardNumber', 'cardExpiryDate', 'bankAccountNumber', 'walletAddress', 'cryptoType', 'paymentMethod', 'receivePaymentMethod']
                          .includes(key))
                      .map(([key, value]) => (
                        <div key={key}>
                          <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong>
                          <span className="ml-2">{String(value)}</span>
                        </div>
                      ))}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRemoveClick(index)}
                      className="absolute top-2 right-2 text-white p-1 rounded-full hover:bg-white transition duration-300"
                    >
                      <TrashIcon className="w-5 h-5 cursor-pointer text-red-700" />
                    </button>
                    <button
                      onClick={() => handleEdit(index)}
                      className="absolute top-2 right-10 text-white p-1 rounded-full hover:bg-[#77E3C8] transition duration-300"
                    >
                      <PencilSquareIcon className="w-5 h-5 cursor-pointer text-yellow-700" />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No other information data available.</p> // Provide a message if financialList is empty
            )}

          </ul>
        </div>
      )}

      {showConfirmDelete !== null && (
        <div className="p-4 mt-2 bg-red-100 border border-red-500 rounded-lg">
          <p className="text-red-700">Are you sure you want to delete this item?</p>
          <div className="mt-2 flex space-x-2">
            <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg">Confirm</button>
            <button onClick={handleCancelDelete} className="px-4 py-2 bg-gray-300 text-black rounded-lg">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialForm;
