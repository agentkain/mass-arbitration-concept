import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

const caseFAQs: FAQItem[] = [
  {
    question: "What information was exposed in the data breach?",
    answer: "The data breach potentially exposed personal and financial information, including names, addresses, Social Security numbers, and account details of HealthEquity customers."
  },
  {
    question: "How do I know if I was affected?",
    answer: "If you held a HealthEquity account before March 25, 2024, your information may have been compromised. HealthEquity sent notification letters to affected individuals in July and August 2023."
  },
  {
    question: "What compensation might I be entitled to?",
    answer: "Affected individuals may be entitled to compensation for identity theft protection services, financial losses resulting from the breach, and other damages. The specific amount will depend on various factors including the extent of the impact."
  },
  {
    question: "How long will the legal process take?",
    answer: "The duration of legal proceedings can vary significantly. We are committed to pursuing the best possible outcome for affected individuals while moving the process forward as efficiently as possible."
  }
];

const generalFAQs: FAQItem[] = [
  {
    question: "Do I need to pay any upfront fees?",
    answer: "No. Our firm works on a contingency fee basis, which means we only get paid if we successfully recover compensation for you."
  },
  {
    question: "What do I need to do after submitting my information?",
    answer: "After submitting your information, our legal team will review your case and contact you to discuss the next steps. We may request additional documentation to support your claim."
  },
  {
    question: "Can I join if I no longer have my HealthEquity account?",
    answer: "Yes. If you had an account during the affected period (before March 25, 2024), you may be eligible to participate regardless of your current account status."
  },
  {
    question: "What documents should I keep?",
    answer: "Please retain any correspondence from HealthEquity, including data breach notifications, account statements, and any documentation of suspicious activity or financial losses related to the breach."
  }
];

function FAQItem({ question, answer, isOpen, onClick }: FAQItem & { isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full py-6 text-left flex justify-between items-center hover:text-blue-600 transition-colors"
        onClick={onClick}
      >
        <span className="text-lg font-medium pr-8">{question}</span>
        <ChevronDown
          className={`flex-shrink-0 w-5 h-5 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-6' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [activeTab, setActiveTab] = useState<'case' | 'general'>('case');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(current =>
      current.includes(index)
        ? current.filter(i => i !== index)
        : [...current, index]
    );
  };

  const currentFAQs = activeTab === 'case' ? caseFAQs : generalFAQs;

  return (
    <div className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12">Frequently Asked Questions</h2>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Side Tabs */}
            <div className="md:w-64 flex-shrink-0">
              <div className="sticky top-8 space-y-2">
                <button
                  className={`w-full text-left px-6 py-3 rounded-lg transition-colors ${
                    activeTab === 'case'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('case')}
                >
                  Case FAQs
                </button>
                <button
                  className={`w-full text-left px-6 py-3 rounded-lg transition-colors ${
                    activeTab === 'general'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('general')}
                >
                  General FAQs
                </button>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg">
                {currentFAQs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openItems.includes(index)}
                    onClick={() => toggleItem(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}