import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface FloatingActionProps {
  onOpenForm: () => void;
}

export default function FloatingAction({ onOpenForm }: FloatingActionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);

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

    // Function to update footer height and visibility (for mobile only)
    const updateFooterState = () => {
      if (window.innerWidth >= 1024) return; // Skip for desktop
      const footerElement = document.querySelector('footer');
      if (footerElement) {
        const footerRect = footerElement.getBoundingClientRect();
        const isVisible = footerRect.top < window.innerHeight;
        setIsFooterVisible(isVisible);
        setFooterHeight(footerElement.offsetHeight);
      }
    };

    // Modified footer observer for desktop version
    const desktopFooterObserver = new IntersectionObserver(
      ([entry]) => {
        if (window.innerWidth >= 1024) {
          setIsFooterVisible(entry.isIntersecting);
        }
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
      desktopFooterObserver.observe(footerElement);
    }

    // Update on scroll for mobile only
    const handleScroll = () => {
      if (window.innerWidth < 1024) {
        requestAnimationFrame(updateFooterState);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateFooterState);
    
    // Initial calculation
    updateFooterState();

    return () => {
      headerObserver.disconnect();
      desktopFooterObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateFooterState);
    };
  }, []);

  return (
    <>
      {/* Desktop version with original behavior */}
      <div 
        className={`hidden lg:block fixed left-4 transition-all duration-300 w-[320px] ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
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

      {/* Mobile version stays the same */}
      <div 
        className={`lg:hidden fixed left-0 right-0 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ 
          bottom: isFooterVisible ? `${footerHeight}px` : '0',
          transition: 'bottom 0.3s ease-in-out',
          zIndex: 30,
          position: 'fixed'
        }}
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