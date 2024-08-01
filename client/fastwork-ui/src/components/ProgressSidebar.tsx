import React, { useState } from 'react';

interface Milestone {
    id: number;
    title: string;
    numberOfDrafts: number;
    todoDescription: string;
    amountToPay: string;
    tasks: string[];
    isOpen: boolean;
}

const ProgressSidebar: React.FC = () => {
    const [openMilestones, setOpenMilestones] = useState<number[]>([]);

    // Sample milestone data for demonstration
    const milestones: Milestone[] = [
        {
            id: 1,
            title: 'Milestone 1',
            numberOfDrafts: 2,
            todoDescription: 'Add color to logo',
            amountToPay: '$100',
            tasks: ['Complete 2 drafts', 'Add color to logo'],
            isOpen: true,
        },
        {
            id: 2,
            title: 'Milestone 2',
            numberOfDrafts: 3,
            todoDescription: 'Finalize logo design',
            amountToPay: '$150',
            tasks: ['Finalize logo design'],
            isOpen: false,
        },
        {
            id: 3,
            title: 'Milestone 3',
            numberOfDrafts: 1,
            todoDescription: 'Prepare final deliverables',
            amountToPay: '$200',
            tasks: ['Prepare final deliverables'],
            isOpen: false,
        },
        {
            id: 4,
            title: 'Review',
            numberOfDrafts: 0,
            todoDescription: '',
            amountToPay: '',
            tasks: [],
            isOpen: false,
        },
        {
            id: 5,
            title: 'Work completed',
            numberOfDrafts: 0,
            todoDescription: '',
            amountToPay: '',
            tasks: [],
            isOpen: false,
        },
    ];

    const toggleMilestone = (id: number) => {
        setOpenMilestones((prev) =>
            prev.includes(id)
                ? prev.filter((milestoneId) => milestoneId !== id)
                : [...prev, id]
        );
    };

    const handleFileUpload = () => {
        document.getElementById('file-input')?.click();
    };

    return (
        <div className="bg-[#E0F7FA] p-4 rounded-lg shadow-md w-[300px]">
            <h2 className="text-lg font-bold mb-4">Progress</h2>
            <ul className="space-y-2">
                {milestones.length > 0 ? milestones.map((milestone) => (
                    <li key={milestone.id}>
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => toggleMilestone(milestone.id)}
                        >
                            <span className={`mr-2 text-black transition-transform duration-200 ${openMilestones.includes(milestone.id) ? 'rotate-90' : ''}`}>
                                ▶
                            </span>
                            <span className="font-semibold">{milestone.title}</span>
                        </div>
                        {openMilestones.includes(milestone.id) && (
                            <div className="ml-4 mt-2">
                                <ul className="list-disc list-inside">
                                    <li>{`Completed ${milestone.numberOfDrafts} drafts`}</li>
                                    <li>{milestone.todoDescription}</li>
                                    <li>{`Amount to pay: ${milestone.amountToPay}`}</li>
                                </ul>
                                <button
                                    className="bg-[#E1824F] text-white rounded-lg px-2 py-1 mt-2"
                                    onClick={handleFileUpload}
                                >
                                    Submit work
                                </button>
                            </div>
                        )}
                    </li>
                )) : (
                    <li>No milestones available</li>
                )}
            </ul>
            <input
                type="file"
                id="file-input"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        alert(`File ${file.name} selected`);
                    }
                }}
            />
        </div>
    );
};

export default ProgressSidebar;
