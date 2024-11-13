import { useState } from 'react'; 
import DeclarationForm from './components/DeclarationForm';
import SigningForm from './components/SigningForm';
import Header from './components/Header';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Details from './components/Details';
import FAQ from './components/FAQ';
import Cases from './components/Cases';
import FloatingAction from './components/FloatingAction';

function App() {
  const [isDeclarationOpen, setIsDeclarationOpen] = useState(false);
  const [isSigningOpen, setIsSigningOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    isOver18: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    aptSuite: '',
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
    declaresUnderPenalty: ''
  });

  const handleDeclarationSubmit = (data: typeof formData) => {
    setFormData(data);
    setIsDeclarationOpen(false);
    setIsSigningOpen(true);
  };

  const handleBack = () => {
    setIsSigningOpen(false);
    setIsDeclarationOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero onOpenForm={() => setIsDeclarationOpen(true)} />
      <div className="relative">
        <div className="lg:pl-[360px]">
          <Details />
          <Timeline />
          <FAQ />
          <Cases />
        </div>
        <FloatingAction onOpenForm={() => setIsDeclarationOpen(true)} />
      </div>
      
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="mb-4">© 2024 Legal Injury Advocates. All rights reserved.</p>
            <p className="text-sm">
              This website is attorney advertising. Nothing on this site is intended to constitute legal advice.
            </p>
          </div>
        </div>
      </footer>

      <DeclarationForm 
        isOpen={isDeclarationOpen}
        onClose={() => setIsDeclarationOpen(false)}
        onSubmit={handleDeclarationSubmit as any}
      />
      <SigningForm 
        isOpen={isSigningOpen}
        onClose={() => setIsSigningOpen(false)}
        formData={formData}
        onBack={handleBack}
      />
    </div>
  );
}

export default App;