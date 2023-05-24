export interface DocumentModel {
  document: string;
}

export interface OfficeSignatureInfo extends OpenSignatureInfo {
  addressPrimary: string;
  addressSecondary: string;
}

export interface OpenSignatureInfo extends DocumentModel {
  signatureComments: string;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  countryName: string;
  signerRole: string;
  commitmentType: string; // Description
}

export interface PdfSignatureInfo extends DocumentModel {
  reason: string;
  location: string;
  contact: string;
  signerRole: string;
  approve: boolean;
}

export interface AnySignatureInfo extends OfficeSignatureInfo {
  force: boolean;
}

export interface AnyDocumentVerifyResult {
  isValid: boolean;
  signatureComments: string;
  addressPrimary: string;
  addressSecondary: string;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  countryName: string;
  signerRole: string;
  commitmentType: string;
}
