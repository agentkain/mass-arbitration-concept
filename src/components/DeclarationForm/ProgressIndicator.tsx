import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  steps: string[];
}

export default function ProgressIndicator({ currentStep, steps }: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="relative mb-8">
        <div className="h-1 w-full bg-gray-200 absolute"></div>
        <div 
          className="h-1 bg-blue-600 absolute transition-all duration-300 ease-in-out"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {/* Step indicators */}
        <div className="relative flex justify-between">
          {steps.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            
            return (
              <div key={stepNumber} className="flex flex-col items-center">
                <div 
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    transition-all duration-300 -mt-3.5
                    ${isCompleted ? 'bg-blue-600 text-white' : ''}
                    ${isActive ? 'bg-blue-600 text-white ring-4 ring-blue-100' : ''}
                    ${!isActive && !isCompleted ? 'bg-white border-2 border-gray-300 text-gray-500' : ''}
                  `}
                >
                  {stepNumber}
                </div>
                <span className={`
                  mt-2 text-xs font-medium
                  ${isActive || isCompleted ? 'text-blue-600' : 'text-gray-500'}
                `}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}