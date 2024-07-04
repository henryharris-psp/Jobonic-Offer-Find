'use client';

import React from 'react';

interface TaskCardProps {
  title: string;
  points: number;
  description: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, points, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-xl">{title}</h4>
        <span className="text-yellow-500 text-lg">+{points}</span>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">
        Check and get points
      </button>
    </div>
  );
};

export default TaskCard;
