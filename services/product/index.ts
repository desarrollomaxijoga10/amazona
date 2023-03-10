import axios from "axios";
import { Product } from "../../types";

export const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get<{ data: Product[] }>("/api/products");
  return data.data;
};
export const getSingleProduct = async (
  id: string | number
): Promise<Product> => {
  const { data } = await axios.get<{ data: Product }>(`/api/products/${id}`);
  return data.data;
};
