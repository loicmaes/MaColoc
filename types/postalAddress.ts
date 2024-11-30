export interface IPostalAddress {
  id: number;
  street: string;
  additional?: string;
  zipCode: string;
  city: string;
  country: string;
}

export type ICreatePostalAddress = Omit<IPostalAddress, "id">;
