import React from 'react';

interface RadioGroupProps {
  name: string;
  label: string;
  value: 'yes' | 'no' | '';
  onChange: (value: 'yes' | 'no') => void;
}

export default function RadioGroup({ name, label, value, onChange }: RadioGroupProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-700">{label}</p>
      <div className="flex space-x-6">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name={name}
            value="yes"
            checked={value === 'yes'}
            onChange={() => onChange('yes')}
            className="h-4 w-4 text-blue-600"
          />
          <span className="text-sm text-gray-700">Yes</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name={name}
            value="no"
            checked={value === 'no'}
            onChange={() => onChange('no')}
            className="h-4 w-4 text-blue-600"
          />
          <span className="text-sm text-gray-700">No</span>
        </label>
      </div>
    </div>
  );
}