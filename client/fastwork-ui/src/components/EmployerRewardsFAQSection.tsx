'use client';

import React from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => (
  <div className="mb-6">
    <h4 className="text-lg font-semibold mb-2">{question}</h4>
    <p className="text-gray-600">{answer}</p>
  </div>
);

const EmployerRewardsFAQSection: React.FC = () => {
  const faqData = [
    {
      question: "How can I join the Jobonic Rewards Program?",
      answer: "Freelancers who have their profiles approved can apply to join the program by logging into the Jobonic Rewards website. Note that the program is currently not available for employers.",
    },
    {
      question: "How can I earn points in the Jobonic Rewards Program?",
      answer: "Points can be earned by completing jobs through the Jobonic system, logging in daily, and participating in various activities specified by Jobonic.",
    },
    {
      question: "What benefits do I get from joining the Jobonic Rewards Program?",
      answer: "Members can redeem points for various benefits, such as cashback, increased visibility, and exclusive coupons from partners.",
    },
    {
      question: "Do Jobonic Rewards points expire?",
      answer: "Yes, points expire at the end of the next year. For example, points earned in 2024 will expire on December 31, 2025. Expired points cannot be redeemed.",
    },
    {
      question: "How can I withdraw Cashback from points?",
      answer: "Cashback can be withdrawn along with your accumulated funds in the Jobonic system. The withdrawal process is detailed on the 'Withdraw Freelance Money' page.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto mt-16">
      <h3 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h3>
      {faqData.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default EmployerRewardsFAQSection;
