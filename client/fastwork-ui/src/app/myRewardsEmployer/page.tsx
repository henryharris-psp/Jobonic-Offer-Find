'use client';

import React, { useState } from 'react';
import EmployerRewardsFAQSection from '@/components/EmployerRewardsFAQSection'; // Adjust the import path as needed

const MyRewardsEmployer = () => {
  const [activeTab, setActiveTab] = useState('accumulatePoints');

  const renderContent = () => {
    switch (activeTab) {
      case 'accumulatePoints':
        return (
          <div>
            <div className="max-w-7xl mx-auto mt-12">
              <h3 className="text-2xl font-bold mb-8 text-center">Mission to get free points</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-16">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-xl">Task Title {index + 1}</h4>
                      <span className="text-yellow-500 text-lg">+{index * 10}</span>
                    </div>
                    <p className="text-gray-600 mb-4">Task description goes here. This should be a brief description.</p>
                    <button className="bg-[#0B2147] text-white py-2 px-4 rounded-full hover:bg-[#D0693B]">Check and get points</button>
                  </div>
                ))}
              </div>
            </div>
            <EmployerRewardsFAQSection />
          </div>
        );
      case 'redeemRewards':
        return (
          <div className="max-w-7xl mx-auto mt-12">
            <h3 className="text-2xl font-bold mb-8 text-center">List of prizes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-16">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img src="/jobonic-black.svg" alt="Prize 1" />
                <p className="text-gray-600 mb-4">Cashback will be credited to your account immediately, worth 25 baht.</p>
                <button className="bg-[#0B2147] text-white py-2 px-4 rounded-full hover:bg-[#D0693B]">500 points</button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img src="/jobonic-black.svg" alt="Prize 2" />
                <p className="text-gray-600 mb-4">Cashback will be credited to your account immediately, worth 50 baht.</p>
                <button className="bg-[#0B2147] text-white py-2 px-4 rounded-full hover:bg-[#D0693B]">1,000 points</button>
              </div>
              {/* Add more prize cards similarly */}
            </div>
          </div>
        );
      case 'usageHistory':
        return (
          <div className="max-w-7xl mx-auto mt-12">
            <h3 className="text-2xl font-bold mb-8 text-center">Usage History</h3>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="border-b-2 border-gray-300 pb-4 mb-4">
                <button className="mr-4 text-blue-500 font-semibold">Earn Points</button>
                <button className="text-gray-500">Exchange Points</button>
              </div>
              <div>
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100 text-gray-600">
                    <tr>
                      <th className="py-2 px-4 text-left">Date received point</th>
                      <th className="py-2 px-4 text-left">Details</th>
                      <th className="py-2 px-4 text-left">Number of points</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr>
                      <td className="py-2 px-4">30/05/2024 14:56</td>
                      <td className="py-2 px-4">Mission: Start using Jobonic Rewards for the first time!</td>
                      <td className="py-2 px-4">+20</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">30/05/2024 14:56</td>
                      <td className="py-2 px-4">Mission: Get free points daily.</td>
                      <td className="py-2 px-4">+1</td>
                    </tr>
                    {/* Add more history items similarly */}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center mt-4">
                <button className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md">1</button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="py-16 px-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-2">Hello, Hine</h2>
          <p className="text-lg mb-4">0 points expire on 31/12/2024</p>
        </div>
        <div className="max-w-7xl mx-auto text-center mt-8">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md flex justify-center space-x-4">
            <button className={`text-black font-semibold ${activeTab === 'accumulatePoints' ? 'underline' : ''}`} onClick={() => setActiveTab('accumulatePoints')}>Accumulate Points</button>
            <button className={`text-black font-semibold ${activeTab === 'redeemRewards' ? 'underline' : ''}`} onClick={() => setActiveTab('redeemRewards')}>Redeem Rewards</button>
            <button className={`text-black font-semibold ${activeTab === 'usageHistory' ? 'underline' : ''}`} onClick={() => setActiveTab('usageHistory')}>Usage History</button>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default MyRewardsEmployer;

