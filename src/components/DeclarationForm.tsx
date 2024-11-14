import React, { useState } from 'react';
import { X } from 'lucide-react';
import RejectionMessage from './DeclarationForm/RejectionMessage';    
import SuccessMessage from './DeclarationForm/SuccessMessage';

interface FormData {
  firstName: string;
  lastName: string;
  isOver18: 'yes' | 'no' | '';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  hasPersonalKnowledge: 'yes' | 'no' | '';
  canTestify: 'yes' | 'no' | '';
  hadAccount: 'yes' | 'no' | '';
  acceptedAgreement: 'yes' | 'no' | '';
  providedInfo: 'yes' | 'no' | '';
  trustedSecurity: 'yes' | 'no' | '';
  believesBreached: 'yes' | 'no' | '';
  retainedFirm: 'yes' | 'no' | '';
  understandsLitigation: 'yes' | 'no' | '';
  authorizesComms: 'yes' | 'no' | '';
  declaresUnderPenalty: 'yes' | 'no' | '';
  aptSuite: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

interface RadioGroupProps {
  name: string;
  label: string;
  value: 'yes' | 'no' | '';
  onChange: (value: 'yes' | 'no') => void;
  error?: boolean;
}

const steps = [
  'Personal Information',
  'Account Details',
  'Legal Authorization'
];

const US_STATES = [
  { value: '', label: 'Select a state' },
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'District of Columbia' }
];

function RequiredLabel({ text, error }: { text: string; error?: boolean }) {
  return (
    <label className={`block text-sm font-medium mb-1 ${error ? 'text-red-600' : 'text-gray-700'}`}>
      {text} <span className="text-red-500">*</span>
    </label>
  );
}

function RadioGroup({ name, label, value, onChange, error }: RadioGroupProps) {
  return (
    <div className="space-y-2">
      <p className={`text-sm ${error ? 'text-red-600' : 'text-gray-700'}`}>
        {label} <span className="text-red-500">*</span>
      </p>
      <div className="flex space-x-6">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name={name}
            value="yes"
            checked={value === 'yes'}
            onChange={() => onChange('yes')}
            className={`h-4 w-4 ${error ? 'border-red-500' : 'border-gray-300'} text-blue-600`}
          />
          <span className={`text-sm ${error ? 'text-red-600' : 'text-gray-700'}`}>Yes</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name={name}
            value="no"
            checked={value === 'no'}
            onChange={() => onChange('no')}
            className={`h-4 w-4 ${error ? 'border-red-500' : 'border-gray-300'} text-blue-600`}
          />
          <span className={`text-sm ${error ? 'text-red-600' : 'text-gray-700'}`}>No</span>
        </label>
      </div>
    </div>
  );
}

function ProgressIndicator({ currentStep }: { currentStep: number }) {
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

export default function DeclarationForm({ isOpen, onClose, onSubmit }: Props) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    isOver18: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    hasPersonalKnowledge: '',
    canTestify: '',
    hadAccount: '',
    acceptedAgreement: '',
    providedInfo: '',
    trustedSecurity: '',
    believesBreached: '',
    retainedFirm: '',
    understandsLitigation: '',
    authorizesComms: '',
    declaresUnderPenalty: '',
    aptSuite: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const [isRejected, setIsRejected] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.state !== 'CA') {
      setIsRejected(true);
    } else {
      setIsSubmitted(true);
      onSubmit(formData);
    }
  };

  const handleClose = () => {
    // Reset form state
    setStep(1);
    setFormData({
      firstName: '',
      lastName: '',
      isOver18: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      hasPersonalKnowledge: '',
      canTestify: '',
      hadAccount: '',
      acceptedAgreement: '',
      providedInfo: '',
      trustedSecurity: '',
      believesBreached: '',
      retainedFirm: '',
      understandsLitigation: '',
      authorizesComms: '',
      declaresUnderPenalty: '',
      aptSuite: '',
    });
    setIsSubmitted(false);
    onClose();
  };

  const validateStep1 = () => {
    const requiredFields = [
      'firstName',
      'lastName',
      'isOver18',
      'address',
      'city',
      'state',
      'zipCode',
      'hasPersonalKnowledge',
      'canTestify'
    ];

    const newFieldErrors: Record<string, boolean> = {};
    requiredFields.forEach(field => {
      newFieldErrors[field] = !formData[field as keyof typeof formData];
    });
    
    setFieldErrors(newFieldErrors);
    return !Object.values(newFieldErrors).some(Boolean);
  };

  const validateStep2 = () => {
    const requiredFields = [
      'hadAccount',
      'acceptedAgreement',
      'providedInfo',
      'trustedSecurity',
      'believesBreached'
    ];

    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    return missingFields.length === 0;
  };

  const validateStep3 = () => {
    const requiredFields = [
      'retainedFirm',
      'understandsLitigation',
      'authorizesComms',
      'declaresUnderPenalty'
    ];

    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    return missingFields.length === 0;
  };

  const handleNextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let isValid = false;
    
    switch (step) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
    }

    if (isValid) {
      setErrors([]);
      setStep(step + 1);
    } else {
      setErrors(['Please complete all required fields before proceeding.']);
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setErrors([]);
    setFieldErrors({});
    setStep(step - 1);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (fieldErrors[field]) {
      setFieldErrors({ ...fieldErrors, [field]: false });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">HealthEquity Data Breach Claim</h2>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          {isRejected ? (
            <RejectionMessage onClose={handleClose} />
          ) : isSubmitted ? (
            <SuccessMessage onClose={handleClose} />
          ) : (
            <>
              <ProgressIndicator currentStep={step} />
              {errors.length > 0 && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  {errors.map((error, index) => (
                    <p key={index} className="text-red-600 text-sm">{error}</p>
                  ))}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Personal Information and Background</h3>
                    
                    <div className="space-y-4">
                      <p className="text-sm text-gray-700">Please provide your legal name</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <RequiredLabel text="First Name" error={fieldErrors.firstName} />
                          <input
                            type="text"
                            required
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500
                              ${fieldErrors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                          />
                        </div>
                        <div>
                          <RequiredLabel text="Last Name" error={fieldErrors.lastName} />
                          <input
                            type="text"
                            required
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500
                              ${fieldErrors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <RadioGroup
                      name="isOver18"
                      label="Are you over 18 years of age?"
                      value={formData.isOver18}
                      onChange={(value) => handleInputChange('isOver18', value)}
                      error={fieldErrors.isOver18}
                    />

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <RequiredLabel text="Street Address" error={fieldErrors.address} />
                          <input
                            type="text"
                            required
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500
                              ${fieldErrors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-gray-700">
                            Apt/Suite (optional)
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            value={formData.aptSuite}
                            onChange={(e) => handleInputChange('aptSuite', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <RequiredLabel text="City" error={fieldErrors.city} />
                        <input
                          type="text"
                          required
                          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500
                            ${fieldErrors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                        />
                      </div>
                      <div>
                        <RequiredLabel text="State" error={fieldErrors.state} />
                        <select
                          required
                          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500
                            ${fieldErrors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                        >
                          {US_STATES.map(state => (
                            <option key={state.value} value={state.value}>
                              {state.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <RequiredLabel text="ZIP Code" error={fieldErrors.zipCode} />
                        <input
                          type="text"
                          required
                          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500
                            ${fieldErrors.zipCode ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        />
                      </div>
                    </div>

                    <RadioGroup
                      name="hasPersonalKnowledge"
                      label="Do you have personal knowledge of the facts related to your HealthEquity account and the events surrounding this matter?"
                      value={formData.hasPersonalKnowledge}
                      onChange={(value) => setFormData({ ...formData, hasPersonalKnowledge: value })}
                    />

                    <RadioGroup
                      name="canTestify"
                      label="Could you testify competently about the facts of this case if required?"
                      value={formData.canTestify}
                      onChange={(value) => setFormData({ ...formData, canTestify: value })}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Account Details and Data Breach Concerns</h3>
                    
                    <RadioGroup
                      name="hadAccount"
                      label="Did you hold an account under the custodianship of HealthEquity, Inc. or one for which HealthEquity served as the administrator before March 25, 2024?"
                      value={formData.hadAccount}
                      onChange={(value) => setFormData({ ...formData, hadAccount: value })}
                    />

                    <RadioGroup
                      name="acceptedAgreement"
                      label="Were you required to consent to and accept HealthEquity's Custodial Agreement to access your account?"
                      value={formData.acceptedAgreement}
                      onChange={(value) => setFormData({ ...formData, acceptedAgreement: value })}
                    />

                    <RadioGroup
                      name="providedInfo"
                      label="Did you provide any personal information to HealthEquity through your account (e.g., sensitive details, financial info)?"
                      value={formData.providedInfo}
                      onChange={(value) => setFormData({ ...formData, providedInfo: value })}
                    />

                    <RadioGroup
                      name="trustedSecurity"
                      label="Did you believe and trust that the personal information you shared with HealthEquity would be kept secure and confidential?"
                      value={formData.trustedSecurity}
                      onChange={(value) => setFormData({ ...formData, trustedSecurity: value })}
                    />

                    <RadioGroup
                      name="believesBreached"
                      label="Do you believe your personal information was accessed or disclosed during the data breach that HealthEquity publicly announced in July and August 2024?"
                      value={formData.believesBreached}
                      onChange={(value) => setFormData({ ...formData, believesBreached: value })}
                    />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Legal Representation and Authorization</h3>
                    
                    <RadioGroup
                      name="retainedFirm"
                      label="Have you retained the legal firm of Legal Injury Advocates to investigate if your personal information was disclosed in this breach and, if so, to pursue a recovery on your behalf?"
                      value={formData.retainedFirm}
                      onChange={(value) => setFormData({ ...formData, retainedFirm: value })}
                    />

                    <RadioGroup
                      name="understandsLitigation"
                      label="Do you understand that this course of action may involve litigation or arbitration, and that Legal Injury Advocates might file a petition to compel HealthEquity to arbitrate your claims according to the Custodial Agreement?"
                      value={formData.understandsLitigation}
                      onChange={(value) => setFormData({ ...formData, understandsLitigation: value })}
                    />

                    <RadioGroup
                      name="authorizesComms"
                      label="Do you authorize Legal Injury Advocates to communicate with HealthEquity and their legal team on your behalf about your personal information and the details of the data breach?"
                      value={formData.authorizesComms}
                      onChange={(value) => setFormData({ ...formData, authorizesComms: value })}
                    />

                    <RadioGroup
                      name="declaresUnderPenalty"
                      label="Do you declare that the information you've provided is true and correct, and acknowledge that this declaration is made under penalty of perjury according to U.S. and California law?"
                      value={formData.declaresUnderPenalty}
                      onChange={(value) => setFormData({ ...formData, declaresUnderPenalty: value })}
                    />
                  </div>
                )}

                <div className="flex justify-between pt-6 border-t">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      Back
                    </button>
                  )}
                  <div className="ml-auto">
                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Submit Form
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}