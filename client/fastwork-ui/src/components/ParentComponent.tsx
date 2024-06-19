import React, { useState } from 'react';
import DealCard from './DealCard';

interface ChatMessage {
  type: 'deal' | 'text';
  content: any;
}

const ParentComponent = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      type: 'deal',
      content: {
        image: 'image_url',
        title: 'Service Title',
        rating: 4.5,
        description: ['Service Description 1', 'Service Description 2'],
        price: '$100',
      },
    },
  ]);

  const handleEditOffer = (newPrice: string) => {
    // Add new message to chat with updated DealCard
    setChatMessages([
      ...chatMessages,
      {
        type: 'deal',
        content: {
          image: 'image_url',
          title: 'Service Title',
          rating: 4.5,
          description: ['Service Description 1', 'Service Description 2'],
          price: newPrice,
        },
      },
    ]);
  };

  return (
    <div>
      {chatMessages.map((message, index) => (
        message.type === 'deal' && (
          <DealCard
            key={index}
            image={message.content.image}
            title={message.content.title}
            rating={message.content.rating}
            description={message.content.description}
            price={message.content.price}
            onAccept={() => console.log('Accepted')}
            onEditOffer={handleEditOffer}
            onDeclineAndSendMessage={() => console.log('Declined')}
          />
        )
      ))}
    </div>
  );
};

export default ParentComponent;
