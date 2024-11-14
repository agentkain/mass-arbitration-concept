import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';
import DeclarationPage from './DeclarationPage';
import html2pdf from 'html2pdf.js';
import SuccessMessage from './DeclarationForm/SuccessMessage';
import Logo from './Logo';

interface Props {
  isOpen: boolean;
  onClose: () => void;
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
  onSigningComplete?: (signatureData: string) => void;
  onBack: () => void;
}

export default function SigningForm({ isOpen, onClose, formData, onSigningComplete, onBack }: Props) {
  const [currentPage, setCurrentPage] = useState<'agreement' | 'declaration'>('agreement');
  const [signatureData, setSignatureData] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const sigCanvas = useRef<SignatureCanvas>(null);
  const currentDate = new Date().toLocaleDateString();
  const [errors, setErrors] = useState<string[]>([]);

  const validateFormData = () => {
    const requiredFields = [
      'firstName',
      'lastName',
      'address',
      'city',
      'state',
      'zipCode',
      'isOver18',
      'hasPersonalKnowledge',
      'canTestify',
      'hadAccount',
      'acceptedAgreement',
      'providedInfo',
      'trustedSecurity',
      'believesBreached',
      'retainedFirm',
      'understandsLitigation',
      'authorizesComms',
      'declaresUnderPenalty'
    ];

    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      setErrors(['Please complete all required fields before proceeding.']);
      return false;
    }

    setErrors([]);
    return true;
  };

  const handleSign = () => {
    if (!validateFormData()) {
      return;
    }

    if (sigCanvas.current) {
      const data = sigCanvas.current.toDataURL();
      setSignatureData(data);
      if (onSigningComplete) {
        onSigningComplete(data);
      }
    }
  };

  const handlePageChange = (page: 'agreement' | 'declaration') => {
    if (page === 'declaration' && !validateFormData()) {
      return;
    }
    setCurrentPage(page);
  };

  const generatePDF = () => {
    const element = document.createElement('div');
    
    element.style.cssText = `
      font-family: Arial, sans-serif;
      line-height: 1.6;
      font-size: 12px;
    `;
    
    element.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto; padding: 0 20px;">
        <!-- Agreement Page -->
        <div>
          <h3 style="font-size: 24px; font-weight: bold; margin: 0 0 24px 0;">Investigation and retention agreement</h3>
          
          <p style="margin-bottom: 16px;">Dear ${formData.firstName},</p>
          
          <p style="margin-bottom: 16px;">Thank you for your interest in pursuing a claim regarding the data breach suffered by HealthEquity, Inc. and its subsidiaries (the "Litigation"). While we are deeply sorry about this unfortunate situation, we are pleased that you have asked us, Legal Injury Advocates LLC ("D&C," "We," or "Us") to represent you in connection with your potential legal claims (the "Lawsuit"). This Agreement describes the terms of our relationship. Please feel free to call us if you have any questions. Our contact information is provided here:</p>
          
          <div style="margin: 20px 0 20px 20px;">
            <p style="margin: 0;">
              Saddle Rock Legal Group LLC,<br />
              7301 N. 16th Street,<br />
              Suite 102, Phoenix, AZ 85020<br />
              (888) 666-6454
            </p>
          </div>

          <h4 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 16px;">Scope of Representation</h4>
          <p>You explained that you believe the HealthEquity data breach impacted you. You also stated that you wish to pursue legal action related to that injury. We told you we would investigate your claim and, if actionable, represent you in connection with your lawsuit.</p>
          
          <p>As part of our representation, we may take all reasonable actions necessary to advance your claims, including hiring agents, experts, and investigators, filing a complaint in court or arbitration, and collaborating with other firms to assist with your case.</p>

          <h4 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 16px;">Client Responsibilities</h4>
          <p>You agree to support the prosecution of your lawsuit by cooperating with us, including:</p>
          <ul style="margin-left: 20px; margin-bottom: 16px;">
            <li>You will provide us with all necessary records relating to your lawsuit.</li>
            <li>You will make yourself available, as necessary, for interviews, depositions, and trial as part of the lawsuit.</li>
            <li>You will, to the fullest extent possible, cooperate and communicate with the Firms' staffs and the attorneys representing you.</li>
            <li>You will keep us updated with any changes to your contact information by emailing support@legalinjuryadvocates.com</li>
          </ul>

          <p>We would like to emphasize two topics. First, you now have a legal obligation to preserve all information relating to the lawsuit. That means you must identify and gather all information—in any format—that might relate to the lawsuit, and then provide it to us as we request. Please note that "information" includes not only written materials, but also recordings, emails, texts, and all other forms of electronically stored or transmitted materials including social media accounts. Please also stop, or opt out of, automatic data, email, and text deletion, that might result in the destruction of that information.</p>

          <p>Second, by law, your lawsuit must be filed within a certain period of time. Failing to provide us with complete and truthful information necessary to advance your lawsuit and/or failing to communicate with us may cause you to forever lose your right to file a lawsuit.</p>

          <h4 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 16px;">Our Fees for Legal Services</h4>
          <p>We will not bill you for any hourly charges for legal services. Instead, you agree to pay D&C for our legal services a contingent fee equal to 40% of the value of your recovery (the "Fee"). This fee will be calculated before you have repaid all client expenses advanced by us. For the avoidance of doubt, our fee is calculated by multiplying the 40% contingency fee against the gross recovery before reimbursement of client expenses.</p>

          <p>The term "Recovery" includes all property, money, or other benefits, obtained for or on your behalf, such as and without limitation, common law damages, statutory damages (including any award of double or treble damages), exemplary or punitive damages, additional damages, interest, and court costs, obtained by settlement, judgment, or otherwise. If the recovery consists of property or other non-monetary benefits, the value of the recovery will be determined by the fair market value of the property or benefit you receive on the date the settlement or judgment is reached.</p>

          <p>Our fee for legal services is wholly dependent upon what you recover. These fees are not fixed by law and are negotiable. If the provisions of this agreement for payment of attorney's fees conflict with any court order, settlement agreement, provision of law or code of professional responsibility which dictates the amount of attorney's fee that may be recovered, then such court order, settlement agreement, provision of law or code of professional responsibility shall govern the amount of the fee owed under this agreement.</p>

          <p>To be clear, if you do not recover anything of value, the fees will be zero.</p>

          <h4 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 16px;">Reimbursement of Client Expenses</h4>
          <p>The term "Client Expenses" means the ordinary expenses associated with litigation such as this, and includes court costs and filing fees, record retrievals and review, investigation services, mediation fees, costs associated with resolving liens, mail and delivery charges, multimedia services, and pre-trial litigation costs such as deposition and related expert fees and expert and non-expert discovery costs (if any). Should your case go to trial, additional trial related client expenses may include travel and transportation costs for attorneys and witnesses, trial exhibits, witness expenses, expert witness fees, and related trial costs.</p>

          <p>You are responsible for these expenses, but rather than invoice you as expenses are incurred before recovery, we will pay for all client expenses as an advancement, with no mark-up. We will deduct advanced client expenses from all recoveries, and you will have an opportunity to review and approve the final expenses before any reimbursement, provided you timely request to do so. If there are no recoveries from the lawsuit, then you will not be obligated to reimburse any client expense.</p>

          <h4 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 16px;">Other Expenses</h4>
          <p>If you require probate counsel or related legal services, we may advance certain costs related to those services. Those advancements will be considered client expenses which we will deduct from all recoveries. You will be responsible for any other probate costs we do not advance.</p>

          <p>You will also be responsible to pay any court awards of costs and attorneys' fees to an opposing party as a result of you providing inaccurate information related to your case or failing to provide us with information or documents we need to continue pursuing your case.</p>

          <h4 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 16px;">Notice of Services Relationship; Potential Conflict</h4>
          <p>We may hire and pay a third-party company called Tekmir Solutions ("Tekmir") to provide certain services related to your case, including providing case management software; collecting, reviewing, and reporting on records and other documents; and assisting with other aspects of your case workup.</p>

          <p>The founding partners of D&C own Tekmir. Thus, they each have a financial interest in Tekmir's provision of services to you. Specifically, Messrs. Duddy and Czarnecki may receive benefits in Tekmir such as through an increase in the value of their equity.</p>

          <p>If we advance case expenses described above for services rendered by Tekmir, those costs will be at actual cost or below the standard market rates for the same services charged by other companies. We believe Tekmir is superior to competing technology products available to lawyers servicing clients like you. However, it is possible that one or more other products or services exist which could be cheaper or preferable in some way.</p>

          <p>You have the right to reject the firm's retention of Tekmir Solutions by emailing support@duddyczarnecki.com.</p>

          <h4 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 16px;">Additional Attorneys</h4>
          <p>You expressly authorize us, if we deem it appropriate, to associate with other qualified law firms ("Associated Counsel") to provide additional representation to you in connection with your claim. We and any associated counsel each will be responsible to represent your interests, but you agree that we will not be financially responsible for willful or intentional misconduct of associated counsel or anyone acting on associated counsel's behalf. We will promptly inform you of any new association, and you may terminate associated counsel for any reason. If additional law firms are added to assist with this matter, you will be informed about the final division of responsibilities among all assisting law firms when you are notified about the actual division of the fee and disbursements, as responsibilities may change during the representation. If we associate with another law firm, the total amount of the fee that you are responsible for will not be increased.</p>

          <h4 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 16px;">Representation of Multiple Clients</h4>
          <p>We represent other clients in this case. The benefit of such common representation is to present a unified claim against the opposing party and to consolidate costs for common clients. Although the interests of all of our clients in this case currently appear to coincide, there is a potential conflict of interest in every multiple representation. For example, a client might decide to pursue a different and inconsistent course of action than other clients if circumstances change or for some other reason. You understand that if such a conflict arises, the firm may be forced to withdraw from representing you, and that, as a result, you could incur additional expenses and inconvenience in securing substitute counsel.</p>

          <p>We will keep confidential both the information you provide us and our communications with you. But we may share information that is common to the representation for all clients. The information may remain confidential and privileged as to third parties (such as opposing parties) but information material to the joint representation of clients will be shared among joint clients as needed. If a client objects to continued common representation or sharing of such common information, the firm may be forced to withdraw as described above. You consent to this representation and give your informed consent to waive this potential conflict that might come from it.</p>

          <h4 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 16px;">No Guarantee of Outcome</h4>
          <p>It is understood and agreed that: (a) no attorney can guarantee the outcome of any lawsuit or any legal action; (b) we have not represented to you that you will recover anything; and (c) obtaining a judgment does not guarantee that any defendant will be able or willing to satisfy a judgment in your favor.</p>

          <h4 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 16px;">Lawsuit Resolution; Settlement</h4>
          <p>Neither we nor any associated counsel(s) will settle your lawsuit without your approval. However, you agree not to make or accept any settlement offer(s) without our consent. Also, you agree to reasonably consider any settlement proposal that we believe is fair.</p>

          <p>Often in cases with many clients, the opposing parties (the defendants) attempt to settle all of a firm's cases in groups by offering the firm's clients settlement amounts varying based on the circumstances of each client's case. This is sometimes known as a "grid" settlement. Or, the defendants may offer the same amount of money to all the firm's clients without consideration of any client's unique circumstances. Regardless of what settlement method is used, in these settlement situations we will not allocate or apportion settlement proceeds as between you and any other client, and if necessary we will rely upon a third party (such as an expert) to help us to determine your share of any lump sum settlement. You will always have the right to approve or reject your individual settlement.</p>

          <h4 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 16px;">Limited Power of Attorney</h4>
          <p>You grant us a limited power of attorney to do the following: to sign documents and papers on your behalf that are relevant to your claims; to endorse your name to any checks or drafts we receive in settlement of the claims after you have approved the settlement offer; to deposit into a client trust account any checks in your name resulting from a settlement; and to deduct fees, costs, disbursements, and expenses.</p>

          <p>Should any defendant file for bankruptcy, you grant a limited and specific power of attorney to us to act as your attorney in that proceeding. You grant us authority to undertake and perform the following on your behalf: (a) to vote to accept or reject any proposed plan; (b) to prepare a ballot in order to vote on the plan; (c) to submit that vote and ballot pursuant to procedures for voting on the plan established by the bankruptcy court; (d) to include you as part of a master ballot (or similar phrase); and (e) to take all actions on your behalf in our discretion necessary to vote your claim.</p>

          <h4 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 16px;">No Third-Party Beneficiaries; Governing Law</h4>
          <p>This agreement shall be enforceable only by the firms representing you, and is not intended to, nor shall it be construed to, create any third-party beneficiary rights. Any actions arising out of this letter agreement shall be governed exclusively by the laws of the District of Columbia and subject to its jurisdiction.</p>

          <p>By this agreement, you hereby provide us authority to execute documents and agreements on your behalf and to collect and hold on your behalf monies paid to you by way of settlement or judgment.</p>

          <h4 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 16px;">Dispute Resolution; Arbitration</h4>
          <p>If a disagreement between us arises from this agreement or our representation of you, it will be resolved through binding arbitration by a single arbitrator under the rules of the American Arbitration Association (AAA). The arbitration will take place in Washington, DC unless the AAA determines that location would be excessively burdensome for you. By agreeing to arbitration, both you and we are giving up the right to seek remedies in court, including trial by jury.</p>

          <p>Arbitration costs will be equally divided between you and us unless you claim dividing costs would cause you undue hardship. If you claim undue hardship, you initially will be required to pay only a filing fee equivalent to what you would pay in court. We will advance the remaining fees and expenses, and the arbitrator will decide how much more you can pay without undue hardship.</p>

          <p>If an arbitrator determines any part of this agreement is invalid or unenforceable, the agreement will be construed as if that part was never in the agreement. Our agreement to resolve disputes through arbitration will not apply if prohibited by applicable ethical rules or if you opt out of arbitration within 90 days of signing this agreement by emailing your opt-out request to support@duddyczarnecki.com.</p>

          <h4 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 16px;">Document Retention</h4>
          <p>During the engagement, we will maintain all documents relevant to this representation. At the conclusion of this engagement, we will retain your documents for a period of five years unless you request that they be returned to you. If you have not requested possession of the file or any of its contents at the end of five years, we will destroy the file in accordance with our record retention program.</p>

          <h4 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 16px;">Client Data and Other Claims</h4>
          <p>During the representation, we expect to collect, review, and analyze various data related to the injuries and legal claim(s) related to the lawsuit. You will supply that data and/or we will obtain that data on your behalf. This information may be shared with associated counsel, if we associate with any, as we determine necessary.</p>

          <p>It is possible that after we collect, review and/or analyze your data and information, we might determine that you do not have a viable claim in the litigation. In this situation, we will notify you that we cannot proceed on your behalf and decline the representation.</p>

          <p>In both situations—where we accept the representation because you have a viable claim, or, if we determine we cannot represent you—we will treat all of your data and information as confidential.</p>

          <p>Finally, by signing this engagement agreement, you consent to our reviewing your data and information, and our right to contact you in the future to alert you to potential legal rights you might possess in other matters or cases. At this time, we are not agreeing to represent you beyond your lawsuit involving the litigation as set forth in this agreement, and you have not asked us to represent you in any other matter or case except your lawsuit. We will contact you in the future if we determine we can represent you on other matters or cases (if any).</p>

          <p>To be clear, any future representation on other potential matters or cases (and any obligation to pay attorneys' fees or expenses in those matters or cases) will be set forth in a separate proposed engagement.</p>

          <h4 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 16px;">Termination; Withdrawal</h4>
          <p>You may terminate your legal representatives at any time by providing reasonable written notice to D&C by either mailing the notice to the address provided in this agreement or by emailing support@duddyczarnecki.com. We may also withdraw as your legal representative or suspend or limit our services to you, in compliance with applicable rules of professional conduct. Such a withdrawal, however, will only be done after providing you adequate notice and an opportunity to secure other counsel if you have not already done so. By your signature below, you acknowledge that such notice may be in the form of email, text message, or mail at our discretion. We reserve the right to seek payment for all costs and client expenses that we and/or associated counsel advance at the time of any termination or withdrawal. Again, if you do not recover anything of value, we will not seek advanced costs or client expenses except as described below.</p>

          <p>If you terminate our representation before your lawsuit ends, and you later receive a recovery, you must still pay us for legal services rendered before termination. If we negotiated a settlement offer before termination, you agree to give us a lien against any recovery up to the greater value of (a) 40% of the offer or (b) the amount to compensate for time and expenses. Upon termination, we will invoice you for any expenses we advanced on your behalf, and you will be responsible to reimburse us those expenses and any applicable interest within 30 days of receipt of the invoice if you obtain any recovery.</p>

          <h4 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 16px;">Communication</h4>
          <p>Throughout your case, we will keep you updated and assist with submitting documents required to advance your lawsuit. We will mainly use email, text, and phone calls to communicate with you.</p>

          <p>By signing this agreement, you authorize us and our agents to send automated texts and calls related to your lawsuit, to the phone number you provided. Those communications may include telemarketing calls with an automatic dialing system or prerecorded voice. Message and data rates may apply. If you prefer not to be contacted in these ways, please do not sign this engagement agreement. Instead, email support@duddyczarnecki.com to let us know your preferences. For additional details on how we collect and use information, consult D&C's Privacy Policy. You confirm that the email and telephone numbers are ones that only you can access, in order to preserve our attorney/client privilege and confidentiality with you.</p>

          <h4 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 16px;">Other Counsel</h4>
          <p>By signing this agreement, you are representing that you have not retained other counsel to represent you in this litigation. If you retain other counsel to assist or represent you in this matter, you agree to email the firm about the new representation within 30 days of retaining new counsel, including providing your new attorney's name, law firm, and phone number.</p>

          <h4 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 16px;">Confidentiality & Social Media</h4>
          <p>Your discussions with us or our staff about your lawsuit are confidential and should not be discussed with anyone else, other than a spouse. If you discuss our conversations with others, you may lose this confidentiality and waive the attorney/client privilege, which means the opposing party could ask for those communications. For this reason, we advise you to avoid posting on social media until your lawsuit is resolved. Anything you say on social media may be used against you in the lawsuit.</p>

          <h4 style="font-size: 18px; font-weight: bold; margin-top: 24px; margin-bottom: 16px;">Miscellaneous</h4>
          <p>This agreement shall be binding upon and insure to the benefit of the parties hereto and their respective heirs, executors, administrators, legal representatives, successors, and assigns where permitted by this agreement. Moreover, in case any one or more of the provisions contained in this agreement shall, for any reason, be held to be invalid, illegal, or unenforceable in any respect, such invalidity, illegality, or unenforceability shall not affect any other provisions thereof, and this agreement shall be construed as if such invalid, illegal, or unenforceable provision had never been contained within it. Further, we may, at our option and with court approval, withdraw from the lawsuit and cease to represent you for any reason consistent with ethical and professional obligations. The headings of the paragraphs in this agreement are for convenience only and do not define, limit, or construe the contents of this agreement. Finally, this agreement constitutes the sole and only agreement of the parties hereto and supersedes any prior understandings or written or oral agreement between the parties about the subject matter. Please remember, you have the right to consult with an attorney of your choice about this agreement.</p>

          <p>We are grateful for the privilege of representing you.</p>

          <div style="margin-top: 40px;">
            <p style="font-weight: bold; margin-bottom: 8px;">Agreed and Accepted</p>
            <p style="margin-bottom: 16px;">Dated: ${currentDate}</p>
            ${signatureData ? `<img src="${signatureData}" alt="Signature" style="max-height: 80px; margin: 20px 0;" />` : ''}
            <p style="margin-left: 32px;">${formData.firstName} ${formData.lastName}</p>
          </div>
        </div>

        <!-- Declaration Page -->
        <div style="page-break-before: always; margin-top: 0;">
          <div style="text-align: right; margin-bottom: 20px;">${currentDate}</div>
          
          <h3 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">Declaration of ${formData.firstName} ${formData.lastName}</h3>
          
          <p>I, ${formData.firstName} ${formData.lastName}, residing at:</p>
          <div style="margin-left: 32px; line-height: 1.2; margin-top: 16px; margin-bottom: 16px;">
            <p>${formData.address}</p>
            ${formData.aptSuite ? `<p>${formData.aptSuite}</p>` : ''}
            <p>${formData.city}, ${formData.state} ${formData.zipCode}</p>
          </div>
          <p>declare under penalty of perjury as follows:</p>

          <ol style="margin-left: 20px; margin-bottom: 30px;">
            <li style="margin-bottom: 12px;">I am <strong>${formData.isOver18 === 'yes' ? 'over' : 'not over'}</strong> 18 years of age.</li>
            <li style="margin-bottom: 12px;">I <strong>${formData.hasPersonalKnowledge === 'yes' ? 'have' : 'do not have'}</strong> personal knowledge of the facts related to my HealthEquity account and the events surrounding this matter.</li>
            <li style="margin-bottom: 12px;">I <strong>${formData.canTestify === 'yes' ? 'can' : 'cannot'}</strong> testify competently about the facts of this case if required.</li>
            <li style="margin-bottom: 12px;">I <strong>${formData.hadAccount === 'yes' ? 'did' : 'did not'}</strong> hold an account under the custodianship of HealthEquity, Inc. or one for which HealthEquity served as the administrator before March 25, 2024.</li>
            <li style="margin-bottom: 12px;">I <strong>${formData.acceptedAgreement === 'yes' ? 'was' : 'was not'}</strong> required to consent to and accept HealthEquity's Custodial Agreement to access my account.</li>
            <li style="margin-bottom: 12px;">I <strong>${formData.providedInfo === 'yes' ? 'did' : 'did not'}</strong> provide personal information to HealthEquity through my account.</li>
            <li style="margin-bottom: 12px;">I <strong>${formData.trustedSecurity === 'yes' ? 'did' : 'did not'}</strong> believe and trust that the personal information I shared with HealthEquity would be kept secure and confidential.</li>
            <li style="margin-bottom: 12px;">I <strong>${formData.believesBreached === 'yes' ? 'believe' : 'do not believe'}</strong> my personal information was accessed or disclosed during the data breach.</li>
            <li style="margin-bottom: 12px;">I <strong>${formData.retainedFirm === 'yes' ? 'have' : 'have not'}</strong> retained Legal Injury Advocates to investigate if my personal information was disclosed in this breach.</li>
            <li style="margin-bottom: 12px;">I <strong>${formData.understandsLitigation === 'yes' ? 'understand' : 'do not understand'}</strong> that this course of action may involve litigation or arbitration.</li>
            <li style="margin-bottom: 12px;">I <strong>${formData.authorizesComms === 'yes' ? 'do' : 'do not'}</strong> authorize Legal Injury Advocates to communicate with HealthEquity and their legal team on my behalf.</li>
          </ol>

          <p style="margin-bottom: 30px;"><strong>I declare under penalty of perjury that the foregoing is true and correct.</strong></p>
          
          <div style="margin-top: 48px; margin-bottom: 32px;">
            <p>Executed on ${currentDate}</p>
            ${signatureData ? `
              <div style="margin: 16px 0;">
                <img src="${signatureData}" alt="Signature" style="max-height: 80px;" />
              </div>
            ` : ''}
            <p style="margin-left: 32px; margin-bottom: 16px;">${formData.firstName} ${formData.lastName}</p>
          </div>
        </div>
      </div>
    `;

    // Format the date for the filename (YYYY-MM-DD)
    const dateForFilename = new Date().toISOString().split('T')[0];
    
    // Create filename with name and date
    const filename = `HealthEquity-Agreement_${formData.lastName}-${formData.firstName}_${dateForFilename}.pdf`;

    const opt = {
      margin: [0.75, 0.75, 0.75, 0.75],
      filename: filename, // Use the new formatted filename
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        letterRendering: true,
        useCORS: true,
        windowHeight: 1123,
        windowWidth: 794
      },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait'
      },
      pagebreak: {
        mode: ['avoid-all', 'css', 'legacy']
      }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      setShowSuccess(true);
    });
  };

  if (!isOpen) return null;

  const handleBackClick = () => {
    console.log('Back button clicked');
    onBack();
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
          <SuccessMessage onClose={onClose} />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] flex flex-col">
        <div className="p-6 flex flex-col h-full">
          {/* Add Logo at the top */}
          <div className="flex justify-center mb-6">            <Logo />
          </div>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Agreement & Declaration</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          {errors.length > 0 && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              {errors.map((error, index) => (
                <p key={index} className="text-red-600 text-sm">{error}</p>
              ))}
            </div>
          )}

          <div className="flex-1 mb-4 overflow-hidden">
            <div 
              className="prose max-w-none text-sm leading-relaxed space-y-4 overflow-y-auto px-4" 
              style={{ 
                height: '20vh',
                minHeight: '200px',
                maxHeight: '20vh'
              }}
            >
              {currentPage === 'agreement' ? (
                <>
                  <h3 className="text-xl font-semibold">Investigation and retention agreement</h3>
                  
                  <p>Dear {formData.firstName},</p>
                  
                  <p>Thank you for your interest in pursuing a claim regarding the data breach suffered by HealthEquity, Inc. and its subsidiaries (the "Litigation"). While we are deeply sorry about this unfortunate situation, we are pleased that you have asked us, Legal Injury Advocates LLC ("D&C," "We," or "Us") to represent you in connection with your potential legal claims (the "Lawsuit"). This Agreement describes the terms of our relationship. Please feel free to call us if you have any questions. Our contact information is provided here:</p>
                  
                  <div className="pl-4">
                    <p>Saddle Rock Legal Group LLC,<br />
                    7301 N. 16th Street,<br />
                    Suite 102, Phoenix, AZ 85020<br />
                    (888) 666-6454</p>
                  </div>

                  <h4 className="font-semibold">Scope of Representation</h4>
                  <p>You explained that you believe the HealthEquity data breach impacted you. You also stated that you wish to pursue legal action related to that injury. We told you we would investigate your claim and, if actionable, represent you in connection with your lawsuit.</p>
                  
                  <p>As part of our representation, we may take all reasonable actions necessary to advance your claims, including hiring agents, experts, and investigators, filing a complaint in court or arbitration, and collaborating with other firms to assist with your case.</p>

                  <h4 className="font-semibold">Client Responsibilities</h4>
                  <p>You agree to support the prosecution of your lawsuit by cooperating with us, including:</p>
                  <ul className="list-disc pl-6">
                    <li>You will provide us with all necessary records relating to your lawsuit.</li>
                    <li>You will make yourself available, as necessary, for interviews, depositions, and trial as part of the lawsuit.</li>
                    <li>You will, to the fullest extent possible, cooperate and communicate with the Firms' staffs and the attorneys representing you.</li>
                    <li>You will keep us updated with any changes to your contact information by emailing support@legalinjuryadvocates.com</li>
                  </ul>

                  <p>We would like to emphasize two topics. First, you now have a legal obligation to preserve all information relating to the lawsuit. That means you must identify and gather all information—in any format—that might relate to the lawsuit, and then provide it to us as we request. Please note that "information" includes not only written materials, but also recordings, emails, texts, and all other forms of electronically stored or transmitted materials including social media accounts. Please also stop, or opt out of, automatic data, email, and text deletion, that might result in the destruction of that information.</p>

                  <p>Second, by law, your lawsuit must be filed within a certain period of time. Failing to provide us with complete and truthful information necessary to advance your lawsuit and/or failing to communicate with us may cause you to forever lose your right to file a lawsuit.</p>

                  <h4 className="font-semibold">Our Fees for Legal Services</h4>
                  <p>We will not bill you for any hourly charges for legal services. Instead, you agree to pay D&C for our legal services a contingent fee equal to 40% of the value of your recovery (the "Fee"). This fee will be calculated before you have repaid all client expenses advanced by us. For the avoidance of doubt, our fee is calculated by multiplying the 40% contingency fee against the gross recovery before reimbursement of client expenses.</p>

                  <p>The term "Recovery" includes all property, money, or other benefits, obtained for or on your behalf, such as and without limitation, common law damages, statutory damages (including any award of double or treble damages), exemplary or punitive damages, additional damages, interest, and court costs, obtained by settlement, judgment, or otherwise. If the recovery consists of property or other non-monetary benefits, the value of the recovery will be determined by the fair market value of the property or benefit you receive on the date the settlement or judgment is reached.</p>

                  <p>Our fee for legal services is wholly dependent upon what you recover. These fees are not fixed by law and are negotiable. If the provisions of this agreement for payment of attorney's fees conflict with any court order, settlement agreement, provision of law or code of professional responsibility which dictates the amount of attorney's fee that may be recovered, then such court order, settlement agreement, provision of law or code of professional responsibility shall govern the amount of the fee owed under this agreement.</p>

                  <p>To be clear, if you do not recover anything of value, the fees will be zero.</p>

                  <h4 className="font-semibold">Reimbursement of Client Expenses</h4>
                  <p>The term "Client Expenses" means the ordinary expenses associated with litigation such as this, and includes court costs and filing fees, record retrievals and review, investigation services, mediation fees, costs associated with resolving liens, mail and delivery charges, multimedia services, and pre-trial litigation costs such as deposition and related expert fees and expert and non-expert discovery costs (if any). Should your case go to trial, additional trial related client expenses may include travel and transportation costs for attorneys and witnesses, trial exhibits, witness expenses, expert witness fees, and related trial costs.</p>

                  <p>You are responsible for these expenses, but rather than invoice you as expenses are incurred before recovery, we will pay for all client expenses as an advancement, with no mark-up. We will deduct advanced client expenses from all recoveries, and you will have an opportunity to review and approve the final expenses before any reimbursement, provided you timely request to do so. If there are no recoveries from the lawsuit, then you will not be obligated to reimburse any client expense.</p>

                  <h4 className="font-semibold">Other Expenses</h4>
                  <p>If you require probate counsel or related legal services, we may advance certain costs related to those services. Those advancements will be considered client expenses which we will deduct from all recoveries. You will be responsible for any other probate costs we do not advance.</p>

                  <p>You will also be responsible to pay any court awards of costs and attorneys' fees to an opposing party as a result of you providing inaccurate information related to your case or failing to provide us with information or documents we need to continue pursuing your case.</p>

                  <h4 className="font-semibold">Notice of Services Relationship; Potential Conflict</h4>
                  <p>We may hire and pay a third-party company called Tekmir Solutions ("Tekmir") to provide certain services related to your case, including providing case management software; collecting, reviewing, and reporting on records and other documents; and assisting with other aspects of your case workup.</p>

                  <p>The founding partners of D&C own Tekmir. Thus, they each have a financial interest in Tekmir's provision of services to you. Specifically, Messrs. Duddy and Czarnecki may receive benefits in Tekmir such as through an increase in the value of their equity.</p>

                  <p>If we advance case expenses described above for services rendered by Tekmir, those costs will be at actual cost or below the standard market rates for the same services charged by other companies. We believe Tekmir is superior to competing technology products available to lawyers servicing clients like you. However, it is possible that one or more other products or services exist which could be cheaper or preferable in some way.</p>

                  <p>You have the right to reject the firm's retention of Tekmir Solutions by emailing support@duddyczarnecki.com.</p>

                  <h4 className="font-semibold">Additional Attorneys</h4>
                  <p>You expressly authorize us, if we deem it appropriate, to associate with other qualified law firms ("Associated Counsel") to provide additional representation to you in connection with your claim. We and any associated counsel each will be responsible to represent your interests, but you agree that we will not be financially responsible for willful or intentional misconduct of associated counsel or anyone acting on associated counsel's behalf. We will promptly inform you of any new association, and you may terminate associated counsel for any reason. If additional law firms are added to assist with this matter, you will be informed about the final division of responsibilities among all assisting law firms when you are notified about the actual division of the fee and disbursements, as responsibilities may change during the representation. If we associate with another law firm, the total amount of the fee that you are responsible for will not be increased.</p>

                  <h4 className="font-semibold">Representation of Multiple Clients</h4>
                  <p>We represent other clients in this case. The benefit of such common representation is to present a unified claim against the opposing party and to consolidate costs for common clients. Although the interests of all of our clients in this case currently appear to coincide, there is a potential conflict of interest in every multiple representation. For example, a client might decide to pursue a different and inconsistent course of action than other clients if circumstances change or for some other reason. You understand that if such a conflict arises, the firm may be forced to withdraw from representing you, and that, as a result, you could incur additional expenses and inconvenience in securing substitute counsel.</p>

                  <p>We will keep confidential both the information you provide us and our communications with you. But we may share information that is common to the representation for all clients. The information may remain confidential and privileged as to third parties (such as opposing parties) but information material to the joint representation of clients will be shared among joint clients as needed. If a client objects to continued common representation or sharing of such common information, the firm may be forced to withdraw as described above. You consent to this representation and give your informed consent to waive this potential conflict that might come from it.</p>

                  <h4 className="font-semibold">No Guarantee of Outcome</h4>
                  <p>It is understood and agreed that: (a) no attorney can guarantee the outcome of any lawsuit or any legal action; (b) we have not represented to you that you will recover anything; and (c) obtaining a judgment does not guarantee that any defendant will be able or willing to satisfy a judgment in your favor.</p>

                  <h4 className="font-semibold">Lawsuit Resolution; Settlement</h4>
                  <p>Neither we nor any associated counsel(s) will settle your lawsuit without your approval. However, you agree not to make or accept any settlement offer(s) without our consent. Also, you agree to reasonably consider any settlement proposal that we believe is fair.</p>

                  <p>Often in cases with many clients, the opposing parties (the defendants) attempt to settle all of a firm's cases in groups by offering the firm's clients settlement amounts varying based on the circumstances of each client's case. This is sometimes known as a "grid" settlement. Or, the defendants may offer the same amount of money to all the firm's clients without consideration of any client's unique circumstances. Regardless of what settlement method is used, in these settlement situations we will not allocate or apportion settlement proceeds as between you and any other client, and if necessary we will rely upon a third party (such as an expert) to help us to determine your share of any lump sum settlement. You will always have the right to approve or reject your individual settlement.</p>

                  <h4 className="font-semibold">Limited Power of Attorney</h4>
                  <p>You grant us a limited power of attorney to do the following: to sign documents and papers on your behalf that are relevant to your claims; to endorse your name to any checks or drafts we receive in settlement of the claims after you have approved the settlement offer; to deposit into a client trust account any checks in your name resulting from a settlement; and to deduct fees, costs, disbursements, and expenses.</p>

                  <p>Should any defendant file for bankruptcy, you grant a limited and specific power of attorney to us to act as your attorney in that proceeding. You grant us authority to undertake and perform the following on your behalf: (a) to vote to accept or reject any proposed plan; (b) to prepare a ballot in order to vote on the plan; (c) to submit that vote and ballot pursuant to procedures for voting on the plan established by the bankruptcy court; (d) to include you as part of a master ballot (or similar phrase); and (e) to take all actions on your behalf in our discretion necessary to vote your claim.</p>

                  <h4 className="font-semibold">No Third-Party Beneficiaries; Governing Law</h4>
                  <p>This agreement shall be enforceable only by the firms representing you, and is not intended to, nor shall it be construed to, create any third-party beneficiary rights. Any actions arising out of this letter agreement shall be governed exclusively by the laws of the District of Columbia and subject to its jurisdiction.</p>

                  <p>By this agreement, you hereby provide us authority to execute documents and agreements on your behalf and to collect and hold on your behalf monies paid to you by way of settlement or judgment.</p>

                  <h4 className="font-semibold">Dispute Resolution; Arbitration</h4>
                  <p>If a disagreement between us arises from this agreement or our representation of you, it will be resolved through binding arbitration by a single arbitrator under the rules of the American Arbitration Association (AAA). The arbitration will take place in Washington, DC unless the AAA determines that location would be excessively burdensome for you. By agreeing to arbitration, both you and we are giving up the right to seek remedies in court, including trial by jury.</p>

                  <p>Arbitration costs will be equally divided between you and us unless you claim dividing costs would cause you undue hardship. If you claim undue hardship, you initially will be required to pay only a filing fee equivalent to what you would pay in court. We will advance the remaining fees and expenses, and the arbitrator will decide how much more you can pay without undue hardship.</p>

                  <p>If an arbitrator determines any part of this agreement is invalid or unenforceable, the agreement will be construed as if that part was never in the agreement. Our agreement to resolve disputes through arbitration will not apply if prohibited by applicable ethical rules or if you opt out of arbitration within 90 days of signing this agreement by emailing your opt-out request to support@duddyczarnecki.com.</p>

                  <h4 className="font-semibold">Document Retention</h4>
                  <p>During the engagement, we will maintain all documents relevant to this representation. At the conclusion of this engagement, we will retain your documents for a period of five years unless you request that they be returned to you. If you have not requested possession of the file or any of its contents at the end of five years, we will destroy the file in accordance with our record retention program.</p>

                  <h4 className="font-semibold">Client Data and Other Claims</h4>
                  <p>During the representation, we expect to collect, review, and analyze various data related to the injuries and legal claim(s) related to the lawsuit. You will supply that data and/or we will obtain that data on your behalf. This information may be shared with associated counsel, if we associate with any, as we determine necessary.</p>

                  <p>It is possible that after we collect, review and/or analyze your data and information, we might determine that you do not have a viable claim in the litigation. In this situation, we will notify you that we cannot proceed on your behalf and decline the representation.</p>

                  <p>In both situations—where we accept the representation because you have a viable claim, or, if we determine we cannot represent you—we will treat all of your data and information as confidential.</p>

                  <p>Finally, by signing this engagement agreement, you consent to our reviewing your data and information, and our right to contact you in the future to alert you to potential legal rights you might possess in other matters or cases. At this time, we are not agreeing to represent you beyond your lawsuit involving the litigation as set forth in this agreement, and you have not asked us to represent you in any other matter or case except your lawsuit. We will contact you in the future if we determine we can represent you on other matters or cases (if any).</p>

                  <p>To be clear, any future representation on other potential matters or cases (and any obligation to pay attorneys' fees or expenses in those matters or cases) will be set forth in a separate proposed engagement.</p>

                  <h4 className="font-semibold">Termination; Withdrawal</h4>
                  <p>You may terminate your legal representatives at any time by providing reasonable written notice to D&C by either mailing the notice to the address provided in this agreement or by emailing support@duddyczarnecki.com. We may also withdraw as your legal representative or suspend or limit our services to you, in compliance with applicable rules of professional conduct. Such a withdrawal, however, will only be done after providing you adequate notice and an opportunity to secure other counsel if you have not already done so. By your signature below, you acknowledge that such notice may be in the form of email, text message, or mail at our discretion. We reserve the right to seek payment for all costs and client expenses that we and/or associated counsel advance at the time of any termination or withdrawal. Again, if you do not recover anything of value, we will not seek advanced costs or client expenses except as described below.</p>

                  <p>If you terminate our representation before your lawsuit ends, and you later receive a recovery, you must still pay us for legal services rendered before termination. If we negotiated a settlement offer before termination, you agree to give us a lien against any recovery up to the greater value of (a) 40% of the offer or (b) the amount to compensate for time and expenses. Upon termination, we will invoice you for any expenses we advanced on your behalf, and you will be responsible to reimburse us those expenses and any applicable interest within 30 days of receipt of the invoice if you obtain any recovery.</p>

                  <h4 className="font-semibold">Communication</h4>
                  <p>Throughout your case, we will keep you updated and assist with submitting documents required to advance your lawsuit. We will mainly use email, text, and phone calls to communicate with you.</p>

                  <p>By signing this agreement, you authorize us and our agents to send automated texts and calls related to your lawsuit, to the phone number you provided. Those communications may include telemarketing calls with an automatic dialing system or prerecorded voice. Message and data rates may apply. If you prefer not to be contacted in these ways, please do not sign this engagement agreement. Instead, email support@duddyczarnecki.com to let us know your preferences. For additional details on how we collect and use information, consult D&C's Privacy Policy. You confirm that the email and telephone numbers are ones that only you can access, in order to preserve our attorney/client privilege and confidentiality with you.</p>

                  <h4 className="font-semibold">Other Counsel</h4>
                  <p>By signing this agreement, you are representing that you have not retained other counsel to represent you in this litigation. If you retain other counsel to assist or represent you in this matter, you agree to email the firm about the new representation within 30 days of retaining new counsel, including providing your new attorney's name, law firm, and phone number.</p>

                  <h4 className="font-semibold">Confidentiality & Social Media</h4>
                  <p>Your discussions with us or our staff about your lawsuit are confidential and should not be discussed with anyone else, other than a spouse. If you discuss our conversations with others, you may lose this confidentiality and waive the attorney/client privilege, which means the opposing party could ask for those communications. For this reason, we advise you to avoid posting on social media until your lawsuit is resolved. Anything you say on social media may be used against you in the lawsuit.</p>

                  <h4 className="font-semibold">Miscellaneous</h4>
                  <p>This agreement shall be binding upon and insure to the benefit of the parties hereto and their respective heirs, executors, administrators, legal representatives, successors, and assigns where permitted by this agreement. Moreover, in case any one or more of the provisions contained in this agreement shall, for any reason, be held to be invalid, illegal, or unenforceable in any respect, such invalidity, illegality, or unenforceability shall not affect any other provisions thereof, and this agreement shall be construed as if such invalid, illegal, or unenforceable provision had never been contained within it. Further, we may, at our option and with court approval, withdraw from the lawsuit and cease to represent you for any reason consistent with ethical and professional obligations. The headings of the paragraphs in this agreement are for convenience only and do not define, limit, or construe the contents of this agreement. Finally, this agreement constitutes the sole and only agreement of the parties hereto and supersedes any prior understandings or written or oral agreement between the parties about the subject matter. Please remember, you have the right to consult with an attorney of your choice about this agreement.</p>

                  <p>We are grateful for the privilege of representing you.</p>

                  <div className="mt-8">
                    <p className="font-semibold">Agreed and Accepted</p>
                    <p>Dated: {currentDate}</p>
                    {signatureData && (
                      <div className="mt-4">
                        <img src={signatureData} alt="Signature" className="max-h-20" />
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <DeclarationPage 
                  formData={formData} 
                  currentDate={currentDate} 
                  signatureData={signatureData} 
                />
              )}
            </div>
          </div>

          {/* Signature section */}
          <div className="border-t pt-4 sticky bottom-0 bg-white">
            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => handlePageChange('agreement')}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 'agreement' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                Agreement
              </button>
              <button
                onClick={() => handlePageChange('declaration')}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 'declaration' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                Declaration
              </button>
            </div>

            {!signatureData ? (
              <>
                <h3 className="text-lg font-semibold mb-3">
                  Please sign below to complete your agreement
                  {errors.length > 0 && (
                    <span className="text-sm text-red-600 ml-2">
                      (Please complete all required fields first)
                    </span>
                  )}
                </h3>
                <div className="border rounded-lg p-4 mb-3">
                  <SignatureCanvas
                    ref={sigCanvas}
                    canvasProps={{
                      className: 'signature-canvas',
                      style: {
                        width: '100%',
                        height: '150px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.375rem',
                        backgroundColor: '#fff'
                      }
                    }}
                    velocityFilterWeight={0.7}
                    minWidth={0.5}
                    maxWidth={2.5}
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={handleBackClick}
                    type="button"
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Back
                  </button>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => sigCanvas.current?.clear()}
                      type="button"
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Clear Signature
                    </button>
                    <button
                      onClick={handleSign}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Sign Document
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex justify-end">
                <button
                  onClick={generatePDF}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Download PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
