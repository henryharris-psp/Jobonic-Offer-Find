import React, { useState, useEffect } from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { Milestone } from '@/types/general';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  milestoneArr: Milestone[];
  onPayAll: () => void;
  onPaySelected: (selectedMilestones: Milestone[], totalAmount: number) => void;
}

const ApproveAndPayModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  milestoneArr,
  onPayAll,
  onPaySelected
}) => {
  const [selectedMilestones, setSelectedMilestones] = useState<Set<string>>(new Set());
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    // Clear selected milestones and total price when modal is closed
    if (!isOpen) {
      setSelectedMilestones(new Set());
      setTotalPrice(0);
    }
  }, [isOpen]);

  const toggleMilestoneSelection = (milestone: Milestone) => {
    setSelectedMilestones(prevState => {
      const updatedSelection = new Set(prevState);
      let newTotalPrice = totalPrice;

      if (updatedSelection.has(milestone.id)) {
        updatedSelection.delete(milestone.id);
        newTotalPrice -= milestone.price || 0;
      } else {
        updatedSelection.add(milestone.id);
        newTotalPrice += milestone.price || 0;
      }

      setTotalPrice(newTotalPrice);
      return updatedSelection;
    });
  };

  const handlePaySelected = () => {
    const selectedMilestonesList = milestoneArr.filter(milestone =>
      selectedMilestones.has(milestone.id)
    );
    onPaySelected(selectedMilestonesList, totalPrice);
    onClose(); // Close modal after selection
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 lg:w-[40%] sm:w-[80%] md:w-[40%] xl:w-[40%]">
        <div className="relative mb-6">
          <h2 className="text-xl font-bold text-center">Which milestones do you want to pay?</h2>
          <XCircleIcon className="h-6 w-6 cursor-pointer text-red-700 absolute -top-8 -right-8" onClick={onClose} />
        </div>
        
        <div className="mb-4 space-y-4">
          {milestoneArr.map(milestone => (
            <div key={milestone.id} className="flex items-center font-bold justify-around">
              <span>{milestone.title}</span>
              <span>${milestone.price?.toFixed(2)}</span> {/* Display the price */}
              <input
                type="checkbox"
                checked={selectedMilestones.has(milestone.id)}
                onChange={() => toggleMilestoneSelection(milestone)}
              />
            </div>
          ))}
        </div>
        
        <div className="mb-4 font-bold text-center">
          Total Price: ${totalPrice.toFixed(2)} {/* Display the total price */}
        </div>

        <div className="flex justify-around space-x-4 font-bold">
          <button
            className="bg-[#E1824F] text-white rounded-lg p-2 w-full"
            onClick={onPayAll}
          >
            Pay all at once
          </button>

          <button
            className={`bg-[#F7EDE7] text-[#E1824F] rounded-lg p-2 w-full ${
              selectedMilestones.size === 0 && 'opacity-50 cursor-not-allowed'
            }`}
            onClick={handlePaySelected}
            disabled={selectedMilestones.size === 0}
          >
            Pay for selected milestones
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveAndPayModal;
