export interface SignModel {
  data: string;
  force: boolean;
  signerInfo: SignerModel;
}

interface SignerModel {
  signer: string;
}

export interface DataModel {
  data: string;
}

export interface OfficeSignatureInfo {
  signatureComments: string;
  addressPrimary: string;
  addressSecondary: string;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  countryName: string;
  signerRole: string;
  commitmentType: string; // Description
  document: string;
}

export type CommitmentType = "created" | "approved" | "created-approved";
