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