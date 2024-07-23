import React from 'react';

const ContractCard: React.FC = () => {
    return (
        <div className="flex flex-row p-5 border shadow-lg rounded-md bg-white">
            <div className="flex flex-col w-1/2 pr-4">
                <div className="flex flex-row mb-4">
                    <img
                        src="path-to-image"
                        alt="Profile"
                        className="w-16 h-16 rounded-full"
                    />
                    <div className="ml-4">
                        <h2 className="text-xl font-bold">Logo designer</h2>
                        <p>Price: $200</p>
                        <p>Deliverable:</p>
                        <ul>
                            <li>3 sets of logo design</li>
                        </ul>
                    </div>
                </div>
                <button className="mt-4 bg-[#E1824F] text-white p-2 rounded">
                    Edit contract
                </button>
            </div>
            <div className="flex flex-col w-1/2 max-h-96 overflow-y-auto">
                <div className="mt-4">
                    <h3 className="font-bold">Milestone 1</h3>
                    <ul>
                        <li>Design colour scheme</li>
                        <li>Create logo draft</li>
                    </ul>
                    <p>10% payment: $100</p>
                </div>
                <div className="mt-4">
                    <h3 className="font-bold">Milestone 2</h3>
                    <ul>
                        <li>Logo draft 2</li>
                        <li>Due by: 5 August 2025</li>
                    </ul>
                    <p>40% payment: $100</p>
                </div>
                <div className="mt-4">
                    <h3 className="font-bold">Milestone 3</h3>
                    <ul>
                        <li>Final logo draft 3</li>
                        <li>Due by: 9 August 2025</li>
                    </ul>
                    <p>20% payment: $100</p>
                </div>
            </div>
        </div>
    );
};

export default ContractCard;



