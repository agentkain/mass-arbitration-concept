import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface FloatingActionProps {
  onOpenForm: () => void;
}

export default function FloatingAction({ onOpenForm }: FloatingActionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    // Header observer
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    // Footer observer
    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '0px'
      }
    );

    const heroElement = document.querySelector('#hero');
    const footerElement = document.querySelector('footer');

    if (heroElement) {
      headerObserver.observe(heroElement);
    }
    if (footerElement) {
      footerObserver.observe(footerElement);
    }

    return () => {
      headerObserver.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  const shouldShow = isVisible;

  return (
    <>
      {/* Desktop version - side box */}
      <div 
        className={`hidden lg:block fixed left-4 transition-all duration-300 w-[320px] ${
          shouldShow ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } ${
          isFooterVisible 
            ? 'bottom-[250px]'
            : 'top-[50vh] -translate-y-1/2'
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-light mb-4">Start your free claim</h3>
          <p className="text-gray-600 mb-6">
            If you were affected by the HealthEquity data breach, you may be entitled to compensation. Start your claim today.
          </p>
          <button
            onClick={onOpenForm}
            className="w-full group flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-sm text-gray-500 mt-4 text-center">
            No upfront costs • Free consultation
          </p>
        </div>
      </div>

      {/* Mobile version - bottom band */}
      <div 
        className={`lg:hidden fixed left-0 right-0 transition-all duration-300 ${
          shouldShow 
            ? isFooterVisible
              ? 'bottom-[120px] translate-y-0'
              : 'bottom-0 translate-y-0'
            : 'translate-y-full'
        }`}
      >
        <div className="bg-white border-t border-gray-200 shadow-lg px-4 py-3">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex-1 mr-4">
              <p className="text-sm font-medium text-gray-900">Start your free claim</p>
              <p className="text-xs text-gray-500">No upfront costs</p>
            </div>
            <button
              onClick={onOpenForm}
              className="flex-shrink-0 group flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}