import React, { useState } from 'react';
import httpClient from '@/client/httpClient';
import { useSelector } from "react-redux";

const FinancialForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiryDate, setCardExpiryDate] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [cryptoType, setCryptoType] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');
  const [receivePaymentMethod, setReceivePaymentMethod] = useState('CREDIT_CARD');
  const [feedbackMessage, setFeedbackMessage] = useState<{ [key: string]: string }>({
    otherInfo: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      cardNumber,
      cardExpiryDate,
      bankAccountNumber,
      walletAddress,
      cryptoType,
      paymentMethod,
      receivePaymentMethod,
    };

    try {
      const response = await httpClient.post('/api/user', formData);
      setFeedbackMessage({
        otherInfo: 'Form submitted successfully!',
      });
      console.log('Form Data Submitted:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFeedbackMessage({
        otherInfo: 'Failed to submit form. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-start w-[60%] ml-16 pb-4">
      <div className="flex space-x-2">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Information</h2>
      </div>

      {feedbackMessage["otherInfo"] && (
        <p className="text-sm mt-2 text-green-800">{feedbackMessage["otherInfo"]}</p>
      )}

      <div className="flex flex-col justify-start min-w-full pb-4">
        
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="credit-card">
            Credit Card Number
          </label>
          <input
            type="text"
            id="credit-card"
            placeholder="e.g. 1234 5678 9123 4567"
            className="block w-[60%] p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="card-expiry-date">
            Card Expiry Date
          </label>
          <input
            type="text"
            id="card-expiry-date"
            placeholder="MM/YY"
            className="block w-[60%] p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            value={cardExpiryDate}
            onChange={(e) => setCardExpiryDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="bank-account">
            Bank Account Number
          </label>
          <input
            type="text"
            id="bank-account"
            placeholder="e.g. 1234567890"
            className="block w-[60%] p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            value={bankAccountNumber}
            onChange={(e) => setBankAccountNumber(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="crypto-address">
            Cryptocurrency Address
          </label>
          <input
            type="text"
            id="crypto-address"
            placeholder="e.g. 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
            className="block w-[60%] p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="crypto-type">
            Type of Cryptocurrency
          </label>
          <input
            type="text"
            id="crypto-type"
            placeholder="e.g. Bitcoin, Ethereum"
            className="block w-[60%] p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            value={cryptoType}
            onChange={(e) => setCryptoType(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="payment-method">
            Select how you want to pay
          </label>
          <select
            id="payment-method"
            value={paymentMethod}
            className="block w-[60%] p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="CREDIT_CARD">Credit Card</option>
            <option value="CRYPTOCURRENCY">Cryptocurrency</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="payment-receive-method">
            Select how you want to be paid
          </label>
          <select
            id="payment-receive-method"
            value={receivePaymentMethod}
            className="block w-[60%] p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setReceivePaymentMethod(e.target.value)}
          >
            <option value="CREDIT_CARD">Credit Card</option>
            <option value="CRYPTOCURRENCY">Cryptocurrency</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-[#0B2147] hover:bg-[#E1824F] text-white font-bold py-2 rounded-lg w-64 mt-4"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FinancialForm;
