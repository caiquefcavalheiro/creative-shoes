import {
  productRegister,
  productResponse,
  productResponses,
} from "@/schemas/products/schema";
import axios from "axios";
import { create } from "zustand";

interface useProductProps {
  state: {
    products: productResponses;
  };
  actions: {
    getProducts: () => Promise<void>;
    createProduct: (data: productRegister) => Promise<productResponse>;
  };
}

const getProducts = async () => {
  const data = await axios
    .get("api/products")
    .then((response) => response.data);
  return data;
};

const createProduct = async (data: productRegister) => {
  const product = await axios
    .post("api/products", data)
    .then((response) => response.data);
  return product;
};

export const useProduct = create<useProductProps>((set) => ({
  state: {
    products: [],
  },
  actions: {
    getProducts: async () => {
      const data = await getProducts();
      set({ state: { products: data } });
    },
    createProduct: async (data) => {
      const response = await createProduct(data);
      return response;
    },
  },
}));
