import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenForm: () => void;
}

export default function Hero({ onOpenForm }: HeroProps) {
  return (
    <div id="hero" className="bg-gray-900 text-white pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <h1 className="font-heading text-4xl md:text-6xl font-light mb-8 leading-tight">
            HealthEquity Data Breach <br />
            <span className="font-normal">Class Action Investigation</span>
          </h1>
          <div className="h-1 w-24 bg-blue-500 mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed">
            If you received a notice about the HealthEquity data breach, you may be entitled to compensation.
          </p>
          <button
            onClick={onOpenForm}
            className="group inline-flex items-center px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 transition-colors rounded-md"
          >
            Get Started
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}