"use client";
import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What services do you provide?",
    answer: "We provide comprehensive GIS and mapping solutions, including spatial data analysis, custom map creation, and geospatial consulting services."
  },
  {
    question: "How can I get started with your services?",
    answer: "You can get started by contacting our team through the contact form or scheduling a consultation call. We'll discuss your needs and provide a tailored solution.You can get started by contacting our team through the contact form or scheduling a consultation call. We'll discuss your needs and provide a tailored solution.You can get started by contacting our team through the contact form or scheduling a consultation call. We'll discuss your needs and provide a tailored solution.You can get started by contacting our team through the contact form or scheduling a consultation call. We'll discuss your needs and provide a tailored solution.You can get started by contacting our team through the contact form or scheduling a consultation call. We'll discuss your needs and provide a tailored solution."
  },
  {
    question: "What are your pricing plans?",
    answer: "Our pricing varies based on project scope and requirements. Contact us for a detailed quote tailored to your specific needs."
  },
  {
    question: "Do you offer support after project completion?",
    answer: "Yes, we provide ongoing support and maintenance services to ensure your systems continue to run smoothly after project completion."
  }
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-sm"
            >
              <button
                className="w-full text-left px-6 py-4 flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-lg">{faq.question}</span>
                <span className="text-2xl">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
