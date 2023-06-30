"use client";

import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { parseCookies } from "nookies";
import { orderResponse } from "@/schemas/order/schema";

interface useCartProps {
  cart: orderResponse[];
  cartQuantity: number;
  actions: {
    addToCart: (id: string) => Promise<void>;
    getUserCart: () => Promise<void>;
    deleteProductCart: (id: string) => Promise<void>;
  };
}

const addToCart = async (id: string) => {
  const { "creative-shoes": token } = parseCookies();

  if (!token) {
    throw new Error(
      "Você precisa estar logado para adicionar produtos ao carrinho"
    );
  }

  axios.defaults.headers["Authorization"] = token;

  const response = await axios
    .post(`api/cart/${id}`)
    .then((response) => response.data)
    .catch((err) => err);

  if (response instanceof AxiosError) {
    throw new Error(response.response?.data.message);
  }

  return response;
};

const getUserCart = async () => {
  const { "creative-shoes": token } = parseCookies();

  axios.defaults.headers["Authorization"] = token;

  const response = await axios
    .get("api/cart")
    .then((response) => response.data)
    .catch((err) => err);

  return response;
};

const deleteProductCart = async (id: string) => {
  const { "creative-shoes": token } = parseCookies();

  if (!token) {
    throw new Error(
      "Você precisa estar logado para adicionar produtos ao carrinho"
    );
  }

  axios.defaults.headers["Authorization"] = token;

  const response = await axios
    .delete(`api/cart/${id}`)
    .then((response) => response.data)
    .catch((err) => err);

  if (response instanceof AxiosError) {
    throw new Error(response.response?.data.message);
  }

  return response;
};

export const useCart = create<useCartProps>((set) => ({
  cartQuantity: 0,
  cart: [],
  actions: {
    addToCart: async (id: string) => {
      const response = await addToCart(id);
      const cartQuantity = response.reduce(
        (acc: number, current: orderResponse) => (acc += current.quantity),
        0
      );
      set(
        (state) => (
          (state.cartQuantity = cartQuantity), (state.cart = response)
        )
      );
    },
    getUserCart: async () => {
      const response = await getUserCart();
      const cartQuantity = response.reduce(
        (acc: number, current: orderResponse) => (acc += current.quantity),
        0
      );
      set(
        (state) => (
          (state.cartQuantity = cartQuantity), (state.cart = response)
        )
      );
    },
    deleteProductCart: async (id: string) => {
      const response = await deleteProductCart(id);
      const cartQuantity = response.reduce(
        (acc: number, current: orderResponse) => (acc += current.quantity),
        0
      );
      set(
        (state) => (
          (state.cartQuantity = cartQuantity), (state.cart = response)
        )
      );
    },
  },
}));
