import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FormData } from './types';
import ProgressIndicator from './ProgressIndicator';
import SuccessMessage from './SuccessMessage';
import RadioGroup from './RadioGroup';
import Logo from '../Logo';

const steps = ['Personal Information', 'Account Details', 'Legal Authorization'];

const initialFormData: FormData = {
  name: '',
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
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FormStep1 = ({ formData, setFormData }: {
  formData: FormData;
  setFormData: (data: FormData) => void;
}) => (
  <div className="space-y-6">
    <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Full Legal Name
      </label>
      <input
        type="text"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
    </div>

    <RadioGroup
      name="isOver18"
      label="Are you over 18 years of age?"
      value={formData.isOver18}
      onChange={(value) => setFormData({ ...formData, isOver18: value })}
    />

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Street Address
      </label>
      <input
        type="text"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
    </div>

    <div className="grid grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City
        </label>
        <input
          type="text"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          State
        </label>
        <input
          type="text"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ZIP Code
        </label>
        <input
          type="text"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          value={formData.zipCode}
          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
        />
      </div>
    </div>
  </div>
);

const FormStep2 = ({ formData, setFormData }: {
  formData: FormData;
  setFormData: (data: FormData) => void;
}) => (
  <div className="space-y-6">
    <h3 className="text-lg font-medium text-gray-900">Account Details</h3>
    
    <RadioGroup
      name="hadAccount"
      label="Did you hold an account with HealthEquity before March 25, 2024?"
      value={formData.hadAccount}
      onChange={(value) => setFormData({ ...formData, hadAccount: value })}
    />

    <RadioGroup
      name="acceptedAgreement"
      label="Did you accept HealthEquity's Custodial Agreement?"
      value={formData.acceptedAgreement}
      onChange={(value) => setFormData({ ...formData, acceptedAgreement: value })}
    />

    <RadioGroup
      name="providedInfo"
      label="Did you provide personal information to HealthEquity?"
      value={formData.providedInfo}
      onChange={(value) => setFormData({ ...formData, providedInfo: value })}
    />

    <RadioGroup
      name="trustedSecurity"
      label="Did you trust HealthEquity to keep your information secure?"
      value={formData.trustedSecurity}
      onChange={(value) => setFormData({ ...formData, trustedSecurity: value })}
    />

    <RadioGroup
      name="believesBreached"
      label="Do you believe your information was compromised in the data breach?"
      value={formData.believesBreached}
      onChange={(value) => setFormData({ ...formData, believesBreached: value })}
    />
  </div>
);

const FormStep3 = ({ formData, setFormData }: {
  formData: FormData;
  setFormData: (data: FormData) => void;
}) => (
  <div className="space-y-6">
    <h3 className="text-lg font-medium text-gray-900">Legal Authorization</h3>
    
    <RadioGroup
      name="hasPersonalKnowledge"
      label="Do you have personal knowledge of the facts related to this matter?"
      value={formData.hasPersonalKnowledge}
      onChange={(value) => setFormData({ ...formData, hasPersonalKnowledge: value })}
    />

    <RadioGroup
      name="canTestify"
      label="Could you testify about these facts if required?"
      value={formData.canTestify}
      onChange={(value) => setFormData({ ...formData, canTestify: value })}
    />

    <RadioGroup
      name="retainedFirm"
      label="Do you agree to retain our legal firm to pursue this claim?"
      value={formData.retainedFirm}
      onChange={(value) => setFormData({ ...formData, retainedFirm: value })}
    />

    <RadioGroup
      name="understandsLitigation"
      label="Do you understand this may involve litigation or arbitration?"
      value={formData.understandsLitigation}
      onChange={(value) => setFormData({ ...formData, understandsLitigation: value })}
    />

    <RadioGroup
      name="authorizesComms"
      label="Do you authorize us to communicate on your behalf?"
      value={formData.authorizesComms}
      onChange={(value) => setFormData({ ...formData, authorizesComms: value })}
    />

    <RadioGroup
      name="declaresUnderPenalty"
      label="Do you declare this information is true under penalty of perjury?"
      value={formData.declaresUnderPenalty}
      onChange={(value) => setFormData({ ...formData, declaresUnderPenalty: value })}
    />
  </div>
);

export default function DeclarationForm({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;


  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleClose = () => {
    if (isSubmitted || step === 1) {
      setStep(1);
      setFormData(initialFormData);
      setIsSubmitted(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              HealthEquity Data Breach Claim
            </h2>
            {(step === 1 || isSubmitted) && (
              <button 
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            )}
          </div>

          {isSubmitted ? (
            <SuccessMessage onClose={handleClose} />
          ) : (
            <>
              <ProgressIndicator currentStep={step} steps={steps} />
              <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                console.log('Form submitted:', formData);
                setIsSubmitted(true);
              }}>
                <div className="space-y-6">
                  {step === 1 && <FormStep1 formData={formData} setFormData={setFormData} />}
                  {step === 2 && <FormStep2 formData={formData} setFormData={setFormData} />}
                  {step === 3 && <FormStep3 formData={formData} setFormData={setFormData} />}
                  
                  <div className="flex justify-between pt-6 border-t mt-6">
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
                          onClick={handleNext}
                          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Submit Declaration
                        </button>
                      )}
                    </div>
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