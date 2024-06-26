import React from 'react';

interface OfferService {
    title: string;
    description: string;
    rate: number;
    completedProjects: number;
    // onClick?: () => void;
    // children?: React.ReactNode;
    // style?: React.CSSProperties;
}

interface OfferServicesProfileCardProps {
  service: OfferService[];
}

const OfferServicesProfileCard = (service: OfferService): React.ReactElement => {
  return (
    <div 
      className="border rounded-lg shadow-md p-8 cursor-pointer
        hover:shadow-lg transition-shadow duration-300 flex flex-col
        justify-between">
          <h3>{service.title}</h3>
    </div>
  );
};

export default OfferServicesProfileCard;
