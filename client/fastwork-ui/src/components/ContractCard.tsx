'use client';

import React from "react";
import Image from 'next/image';

interface Contract {
  title: string;
  company: string;
  profilePic: string;
  price: string;
  deliverables: string[];
  milestones: { name: string; tasks: string[]; dueDate?: string; payment: string }[];
}

interface ContractCardProps {
  contract: Contract;
  onEditContract: () => void;
}

const ContractCard = ({ contract, onEditContract }: ContractCardProps): React.ReactElement => {
  return (
      <div className="bg-white p-6 rounded-lg shadow-md flex space-x-4">
        <div className="flex-shrink-0">
          <Image src={contract.profilePic} alt="Profile Pic" width={50} height={50} className="rounded-full" />
        </div>
        <div className="flex-grow">
          <h2 className="text-xl font-bold">{contract.title}</h2>
          <p className="text-gray-500">{contract.company}</p>
          <p className="mt-2 text-sm"><strong>Price:</strong> {contract.price}</p>
          <p className="text-sm"><strong>Deliverable:</strong></p>
          <ul className="list-disc list-inside">
            {contract.deliverables.map((deliverable, index) => (
                <li key={index}>{deliverable}</li>
            ))}
          </ul>
          <div className="mt-4">
            {contract.milestones.map((milestone, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">{milestone.name}</h3>
                  <ul className="list-disc list-inside">
                    {milestone.tasks.map((task, taskIndex) => (
                        <li key={taskIndex}>{task}</li>
                    ))}
                    {milestone.dueDate && (
                        <li className="text-gray-500">due by: {milestone.dueDate}</li>
                    )}
                  </ul>
                  <p className="text-sm mt-1"><strong>{milestone.payment}</strong></p>
                </div>
            ))}
          </div>
        </div>
        <div className="flex items-start">
          <button
              className="bg-[#E1824F] text-white rounded-lg px-4 py-2"
              onClick={onEditContract}
          >
            Edit contract
          </button>
        </div>
      </div>
  );
};

export default ContractCard;










