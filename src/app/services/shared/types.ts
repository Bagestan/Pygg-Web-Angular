export type Customer = {
  name: string;
  id: number;
  CNPJ: string;
};

export type Product = {
  img: any;
  collectionId: number;
  collectionName: string;
  colors: string;
  referenceName: string;
  referenceId: number;
  price: number;
};

export type ProductCost = {
  markup: {
    markupId: number;
    markupName: string;
    markupInterest: number;
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
