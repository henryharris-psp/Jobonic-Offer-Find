"use client";
import React from "react";
import FlipTestimonialCard from "./FlipSC"; // Adjust the import path according to your project structure

interface Testimonial {
  quote: string;
  name: string;
  image: string;
  description: string;
}

interface SatisfiedCollaboratorsProps {
  testimonials: Testimonial[];
}

const SatisfiedCollaborators: React.FC<SatisfiedCollaboratorsProps> = ({
  testimonials,
}) => {
  return (
    <section className="py-16 px-4 md:px-0">
      <div className="max-w-5xl mx-auto text-center">
        <h2
          className="text-3xl md:text-5xl font-bold mb-12"
          style={{ color: "#E1824F" }}// Color for "Our satisfied collaborators"
        >
          <span style={{ color: "#E1824F" }}>10,000,101</span> satisfied collaborators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <FlipTestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              image={testimonial.image}
              description={testimonial.description}
              backgroundColor="#CFECF2" // Pass the background color as a prop
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SatisfiedCollaborators;

