export interface FormData {
  name: string;
  isOver18: 'yes' | 'no' | '';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  hasPersonalKnowledge: 'yes' | 'no' | '';
  canTestify: 'yes' | 'no' | '';
  hadAccount: 'yes' | 'no' | '';
  acceptedAgreement: 'yes' | 'no' | '';
  providedInfo: 'yes' | 'no' | '';
  trustedSecurity: 'yes' | 'no' | '';
  believesBreached: 'yes' | 'no' | '';
  retainedFirm: 'yes' | 'no' | '';
  understandsLitigation: 'yes' | 'no' | '';
  authorizesComms: 'yes' | 'no' | '';
  declaresUnderPenalty: 'yes' | 'no' | '';
}

export interface Props {
  isOpen: boolean;
  onClose: () => void;
}