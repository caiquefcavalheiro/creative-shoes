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
    product: productResponse;
    products: productResponses;
  };
  actions: {
    getProducts: () => Promise<void>;
    getProcutsByName: (name: string) => Promise<void>;
    createProduct: (data: productRegister) => Promise<productResponse>;
    patchProduct: (id: string, data: productPatch) => Promise<productPatch>;
    deleteProduct: (id: string) => Promise<void>;
    selectProduct: (data: any) => void;
  };
}

const getProducts = async () => {
  const data = await axios
    .get("api/products")
    .then((response) => response.data);
  return data;
};

const getProductByName = async (name: string) => {
  const response = await axios
    .get(`api/products/name/${name}`)
    .then((response) => response.data)
    .catch((err) => err);

  if (response instanceof AxiosError) {
    throw new Error(response.response?.data.message);
  }

  return response;
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

const deleteProduct = async (id: string) => {
  const response = await axios
    .delete(`api/products/${id}`)
    .then((response) => response.data);

  if (response instanceof AxiosError) {
    throw new Error(response.response?.data.message);
  }
};

export const useProduct = create<useProductProps>((set) => ({
  state: {
    product: {} as productResponse,
    products: [],
  },
  actions: {
    getProcutsByName: async (name) => {
      const data = await getProductByName(name);
      set((state) => (state.state.products = data));
    },
    getProducts: async () => {
      const data = await getProducts();
      set((state) => (state.state.products = data));
    },
    createProduct: async (data) => {
      const response = await createProduct(data);
      return response;
    },
    patchProduct: async (id, data) => {
      const response = await patchProduct(id, data);
      return response;
    },
    deleteProduct: async (id) => {
      await deleteProduct(id);
    },
    selectProduct: (data) => {
      set((state) => (state.state.product = data));
    },
  },
}));
