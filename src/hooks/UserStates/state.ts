"use client";

import axios, { AxiosError } from "axios";
import { create } from "zustand";
import {
  userLogin,
  userRegister,
  usersResponse,
} from "../../schemas/user/schema";

interface useUsersProps {
  state: {
    users: usersResponse;
  };
  actions: {
    getUsers: () => Promise<void>;
    createUser: (data: userRegister) => Promise<void>;
    loginUser: (data: userLogin) => Promise<any>;
  };
}

const getUsers = async () => {
  const data = await axios.get("api/user").then((response) => response.data);
  return data;
};

const createUser = async (data: userRegister) => {
  const response = await axios
    .post("/api/user", data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => response)
    .catch((err) => err);

  if (response instanceof AxiosError) {
    throw new Error(response.response?.data.message);
  }
};

const loginUser = async (data: userLogin) => {
  const response = await axios
    .post("/api/login", data)
    .then((response) => response)
    .catch((error) => error);

  if (response instanceof AxiosError) {
    throw new Error(response.response?.data.message);
  }

  return response.data;
};

export const useUser = create<useUsersProps>((set) => ({
  state: {
    users: [],
  },
  actions: {
    getUsers: async () => {
      const data = await getUsers();
      set({ state: { users: data } });
    },
    createUser: async (userData) => {
      await createUser(userData);
      const data = await getUsers();
      set({ state: { users: data } });
    },
    loginUser: async (data) => {
      return await loginUser(data);
    },
  },
}));
