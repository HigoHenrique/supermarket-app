import axios from "axios";
import { Product } from "@/types/Product";
import { Brand } from "@/types/Brand";

const api = axios.create({
  baseURL: "http://localhost:3001/api", // pode mudar se necessário
});

export const getProducts = (page = 1, pageSize = 10, search = "") =>
  api.get<{ products: Product[]; total: number }>(`/products`, {
    params: { page, pageSize, search },
  });

export const getBrands = () =>
  api.get<Brand[]>(`/brands`);

export const getProductById = (id: string) =>
  api.get<Product>(`/products/${id}`);

export const createProduct = (product: Omit<Product, "id">) =>
  api.post<Product>("/products", product);

export const createBrand = (brand: Omit<Brand, "id">) =>
  api.post<Brand>("/brands", brand);
