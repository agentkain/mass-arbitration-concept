import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface CaseCard {
  title: string;
  description: string;
  status: string;
  link: string;
}

const cases: CaseCard[] = [
  {
    title: "HealthEquity Data Breach",
    description: "Investigation into unauthorized access of customer data affecting millions of healthcare accounts.",
    status: "Active Investigation",
    link: "#"
  },
  {
    title: "T-Mobile Data Breach",
    description: "Investigation into unauthorized access affecting millions of current and former customers.",
    status: "Active Investigation",
    link: "#"
  },
  {
    title: "Capital One Settlement",
    description: "Class action settlement for customers affected by the 2019 data breach.",
    status: "Settlement Phase",
    link: "#"
  },
  {
    title: "Optum Data Exposure",
    description: "Ongoing investigation into healthcare data exposure affecting patients nationwide.",
    status: "Pre-litigation",
    link: "#"
  },
  {
    title: "Morgan Stanley Data Breach",
    description: "Investigation into the exposure of customer financial data through legacy systems.",
    status: "Settlement Phase",
    link: "#"
  },
  {
    title: "Anthem Healthcare Breach",
    description: "Class action regarding unauthorized access to patient health information.",
    status: "Active Investigation",
    link: "#"
  },
  {
    title: "Quest Diagnostics Breach",
    description: "Investigation into the exposure of medical test results and patient information.",
    status: "Pre-litigation",
    link: "#"
  },
  {
    title: "Kaiser Data Exposure",
    description: "Class action regarding unauthorized access to patient records and medical history.",
    status: "Active Investigation",
    link: "#"
  },
  {
    title: "UnitedHealth Breach",
    description: "Investigation into compromised healthcare records affecting plan members.",
    status: "Pre-litigation",
    link: "#"
  }
];

export default function Cases() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth >= 768 ? 3 : 1);
  const totalPages = Math.ceil(cases.length / itemsPerPage);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 768 ? 3 : 1);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((current) => 
      current + itemsPerPage >= cases.length ? 0 : current + itemsPerPage
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((current) => 
      current - itemsPerPage < 0 ? cases.length - itemsPerPage : current - itemsPerPage
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPage = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index * itemsPerPage);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-light">Explore Our Cases</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                disabled={isAnimating}
                aria-label="Previous cases"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                disabled={isAnimating}
                aria-label="Next cases"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex * (100 / itemsPerPage))}%)`,
              }}
            >
              {cases.map((caseItem, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 px-4 ${
                    window.innerWidth >= 768 ? 'w-1/3' : 'w-full'
                  }`}
                >
                  <a
                    href={caseItem.link}
                    className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 p-6 block h-full transform hover:scale-105 hover:-translate-y-1"
                  >
                    <div className="text-sm font-medium text-blue-600 mb-2">
                      {caseItem.status}
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {caseItem.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {caseItem.description}
                    </p>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index * itemsPerPage)}
                  disabled={isAnimating}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / itemsPerPage) === index
                      ? 'bg-blue-600 w-4'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}