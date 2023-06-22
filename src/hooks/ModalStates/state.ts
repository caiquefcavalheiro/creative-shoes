import { create } from "zustand";

interface ModalStatesProps {
  loginState: boolean;
  registerState: boolean;
  productState: boolean;

  actions: {
    setLoginState: (data: boolean) => void;
    setRegisterState: (data: boolean) => void;
    setProductState: (data: boolean) => void;
  };
}

export const useModalState = create<ModalStatesProps>((set) => ({
  loginState: false,
  registerState: false,
  productState: true,
  actions: {
    setLoginState: (data) => set({ loginState: data }),
    setRegisterState: (data) => set({ registerState: data }),
    setProductState: (data) => set({ productState: data }),
  },
}));
