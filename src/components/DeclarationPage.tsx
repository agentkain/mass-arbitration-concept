interface DeclarationPageProps {
  formData: {
    firstName: string;
    lastName: string;
    isOver18: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    hasPersonalKnowledge: string;
    canTestify: string;
    hadAccount: string;
    acceptedAgreement: string;
    providedInfo: string;
    trustedSecurity: string;
    believesBreached: string;
    retainedFirm: string;
    understandsLitigation: string;
    authorizesComms: string;
    declaresUnderPenalty: string;
    aptSuite: string;
  };
  currentDate: string;
  signatureData?: string;
}
    
export default function DeclarationPage({ formData, currentDate, signatureData }: DeclarationPageProps) {
  return (
    <div className="declaration-page">
      <div className="prose max-w-none text-sm leading-relaxed space-y-4">
        
        <div className="text-right">{currentDate}</div>
        
        <div className="space-y-1">
          <p>I, {formData.firstName} {formData.lastName}, residing at:</p>
          <div className="ml-8 leading-tight my-4">
            <p>{formData.address}</p>
            {formData.aptSuite && <p>{formData.aptSuite}</p>}
            <p>{formData.city}, {formData.state} {formData.zipCode}</p>
          </div>
          <p>declare under penalty of perjury as follows:</p>
        </div>

        <ol className="list-decimal space-y-3 ml-8">
          <li className="pl-2">I am {formData.isOver18 === 'yes' ? 'over' : 'not over'} 18 years of age.</li>
          
          <li className="pl-2">I {formData.hasPersonalKnowledge === 'yes' ? 'have' : 'do not have'} personal knowledge of the facts related to my HealthEquity account and the events surrounding this matter.</li>
          
          <li className="pl-2">I {formData.canTestify === 'yes' ? 'can' : 'cannot'} testify competently about the facts of this case if required.</li>
          
          <li className="pl-2">I {formData.hadAccount === 'yes' ? 'did' : 'did not'} hold an account under the custodianship of HealthEquity, Inc. or one for which HealthEquity served as the administrator before March 25, 2024.</li>
          
          <li className="pl-2">I {formData.acceptedAgreement === 'yes' ? 'was' : 'was not'} required to consent to and accept HealthEquity's Custodial Agreement to access my account.</li>
          
          <li className="pl-2">I {formData.providedInfo === 'yes' ? 'did' : 'did not'} provide personal information to HealthEquity through my account.</li>
          
          <li className="pl-2">I {formData.trustedSecurity === 'yes' ? 'did' : 'did not'} believe and trust that the personal information I shared with HealthEquity would be kept secure and confidential.</li>
          
          <li className="pl-2">I {formData.believesBreached === 'yes' ? 'believe' : 'do not believe'} my personal information was accessed or disclosed during the data breach.</li>
          
          <li className="pl-2">I {formData.retainedFirm === 'yes' ? 'have' : 'have not'} retained Legal Injury Advocates to investigate if my personal information was disclosed in this breach.</li>
          
          <li className="pl-2">I {formData.understandsLitigation === 'yes' ? 'understand' : 'do not understand'} that this course of action may involve litigation or arbitration.</li>
          
          <li className="pl-2">I {formData.authorizesComms === 'yes' ? 'do' : 'do not'} authorize Legal Injury Advocates to communicate with HealthEquity and their legal team on my behalf.</li>
          
          <li className="pl-2">I {formData.declaresUnderPenalty === 'yes' ? 'do' : 'do not'} declare that the information provided is true and correct under penalty of perjury according to U.S. and California law.</li>
        </ol>

        <p>I declare under penalty of perjury that the foregoing is true and correct.</p>
        
        <div className="mt-8">
          <p>Executed on {currentDate}</p>
          {signatureData ? (
            <div className="mt-4 w-full">
              <img 
                src={signatureData} 
                alt="Signature" 
                className="max-h-32 w-full object-contain"
                style={{ minHeight: '120px' }}
              />
            </div>
          ) : (
            <p className="mt-8 py-8 border-b border-gray-400">By: _______________________________</p>
          )}
          <p className="ml-8">{formData.firstName} {formData.lastName}</p>
        </div>
      </div>
    </div>
  );
} 