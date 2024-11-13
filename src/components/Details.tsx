import React from 'react';

export default function Details() {
  return (
    <div className="bg-white text-gray-900 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-8">Case Details</h2>

          {/* Key Points Box */}
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h3 className="text-xl font-medium mb-6">Key Points</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span>HealthEquity discovered unauthorized access to their systems containing sensitive customer information in July 2023</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span>Personal and financial information of millions of customers was potentially exposed</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span>Affected individuals may be entitled to compensation for identity theft protection and other damages</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span>Legal action is being taken to protect affected individuals' rights</span>
              </li>
            </ul>
          </div>

          {/* Case Overview */}
          <div>
            <h3 className="text-xl font-medium mb-6">Case Overview</h3>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                In July 2023, HealthEquity, a major healthcare savings account administrator, discovered unauthorized access to their systems containing sensitive customer information. The breach potentially exposed personal and financial data of millions of customers who held accounts with HealthEquity.
              </p>
              <p className="mb-4">
                The compromised information may include names, addresses, Social Security numbers, account numbers, and other sensitive personal and financial data. This security breach raises serious concerns about the protection of customer information and potential risks of identity theft.
              </p>
              <p>
                Legal action is being pursued to ensure affected individuals receive appropriate compensation and protection. If you held a HealthEquity account before March 25, 2024, you may be eligible to participate in this legal action to recover compensation for potential damages and identity theft protection services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}