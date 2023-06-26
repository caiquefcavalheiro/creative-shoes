"use client";

import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { parseCookies } from "nookies";

interface useCartProps {
  cart: [];
  actions: {
    addToCart: (id: string) => Promise<void>;
    getUserCart: () => Promise<void>;
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

export const useCart = create<useCartProps>((set) => ({
  cart: [],
  actions: {
    addToCart: async (id: string) => {
      const response = await addToCart(id);
      set((state) => (state.cart = response));
    },
    getUserCart: async () => {
      const response = await getUserCart();
      set((state) => (state.cart = response));
    },
  },
}));
