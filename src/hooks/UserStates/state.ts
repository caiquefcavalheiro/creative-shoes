import axios from "axios";
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
    loginUser: (data: userLogin) => Promise<boolean>;
  };
}

const getUsers = async () => {
  const data = await axios.get("api/user").then((response) => response.data);
  return data;
};

const createUser = async (data: userRegister) => {
  await axios
    .post("/api/user", data)
    .then((response) => response)
    .catch(() => console.log("error"));
};

const loginUser = async (data: userLogin) => {
  const token = await axios
    .post("/api/login", data)
    .then((response) => response)
    .catch((error) => console.log("error"));

  if (typeof token === "string") {
    localStorage.setItem("token", token);
    return true;
  }
  return false;
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
