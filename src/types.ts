export interface LinkDetails {
  baseUrl: string;
  link: string;
  pagination: boolean;
  selector: {
    productMainDivClass: string;
    productName: string;
    productPrice: string;
    productDescription: string;
    productLink: string;
  };
}

export interface LinkType {
  [key: string]: LinkDetails;
}

export interface ProductDetails {
  name: string;
  description: string;
  price: string;
  link: string;
}
