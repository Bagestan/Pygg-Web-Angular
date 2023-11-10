export type Customer = {
  name: string;
  id: number;
  CNPJ: string;
};

export type Product = {
  collectionId: number;
  collectionName: string;
  colors: string;
  referenceName: string;
  referenceId: number;
  cost: number;
};

export type ProductCost = {
  markup: {
    markupId: number;
    markupName: string;
    markupInterest: number;
    markupMargin: number;
  };
  payment: {
    paymentId: number;
    paymentName: string;
    paymentInterest: number;
  };
  profit: number;
};

export type Taxes = {
  CSLL: number;
  IR: number;
};

export interface MarkupData {
  ID_TAB: number;
  CD_DS: string;
  MKP_TOT: number;
  MC_TOT: number;
}

export interface PaymentData {
  CD_DS: string;
  ID_PGTO: number;
  JUR_TOT: number;
}
