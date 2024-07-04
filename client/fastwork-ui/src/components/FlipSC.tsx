"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  quote: string;
  name: string;
  image: string;
  description: string;
  backgroundColor: string; // Add backgroundColor prop
}

const FlipTestimonialCard: React.FC<Testimonial> = ({
  quote,
  name,
  image,
  description,
  backgroundColor,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div className="flip-card-container" onMouseEnter={() => setIsFlipped(true)} onMouseLeave={() => setIsFlipped(false)}>
      <motion.div
        className="flip-card"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        <div className="flip-card-front card-content" style={{ backgroundColor }}>
          <div className="flex-grow">
            <p className="text-lg text-left font-semibold mb-2">“{quote}”</p>
          </div>
          <div className="flex items-center mt-4">
            <Image
              src={image}
              alt={name}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="ml-4 text-left">
              <h3 className="text-md font-bold text-black">{name}</h3>
              <p className="text-gray-700 text-sm">{description}</p>
            </div>
          </div>
        </div>
        <div className="flip-card-back card-content" style={{ backgroundColor }}>
          <h3 className="text-md font-bold text-black">{name}</h3>
          <p className="text-gray-700 text-sm mt-2">{description}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipTestimonialCard;
