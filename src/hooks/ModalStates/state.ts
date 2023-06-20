import { create } from "zustand";

interface ModalStatesProps {
  loginState: boolean;
  registerState: boolean;

  actions: {
    setLoginState: (data: boolean) => void;
    setRegisterState: (data: boolean) => void;
  };
}

export const useModalState = create<ModalStatesProps>((set) => ({
  loginState: false,
  registerState: false,
  actions: {
    setLoginState: (data) => set({ loginState: data }),
    setRegisterState: (data) => set({ registerState: data }),
  },
}));
