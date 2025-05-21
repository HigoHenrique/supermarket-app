import { Brand } from "./Brand";

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string; // base64
  brandId: string;
  brand?: Brand; // opcional para facilitar no front
}
