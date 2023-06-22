"use client";

import {
  productPatch,
  productRegister,
  productResponse,
  productResponses,
} from "@/schemas/products/schema";
import axios, { AxiosError } from "axios";
import { create } from "zustand";

interface useProductProps {
  state: {
    products: productResponses;
  };
  actions: {
    getProducts: () => Promise<void>;
    createProduct: (data: productRegister) => Promise<productResponse>;
    patchProduct: (id: string, data: productPatch) => Promise<productPatch>;
  };
}

const getProducts = async () => {
  const data = await axios
    .get("api/products")
    .then((response) => response.data);
  return data;
};

const createProduct = async (data: productRegister) => {
  const response = await axios
    .post("api/products", data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => response.data)
    .catch((err) => err);

  if (response instanceof AxiosError) {
    throw new Error(response.response?.data.message);
  }

  return response;
};

const patchProduct = async (id: string, data: productPatch) => {
  const response = await axios
    .patch(`api/products/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => response.data);

  return response;
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
    patchProduct: async (id, data) => {
      const response = await patchProduct(id, data);
      return response;
    },
  },
}));