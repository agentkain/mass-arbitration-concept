import { XCircle } from 'lucide-react';

export default function RejectionMessage({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center py-8">
      <div className="flex justify-center mb-6">
        <XCircle className="w-16 h-16 text-red-500" />
      </div>
      <h3 className="text-2xl font-medium text-gray-900 mb-4">
        Application Review Status
      </h3>
      <p className="text-gray-600 mb-4 max-w-md mx-auto">
        Unfortunately, based on the answers you provided, we are unable to process your application at this time.
      </p>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Thank you for your interest.
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