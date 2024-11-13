import { CheckCircle } from 'lucide-react';

export default function SuccessMessage({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center py-8">
      <div className="flex justify-center mb-6">
        <CheckCircle className="w-16 h-16 text-green-500" />
      </div>
      <h3 className="text-2xl font-medium text-gray-900 mb-4">
        Thank You for Your Submission
      </h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Your HealthEquity data breach claim has been successfully submitted. Our legal team will review your information and contact you soon.
      </p>
      <button
        onClick={onClose}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Close
      </button>
    </div>
  );
}