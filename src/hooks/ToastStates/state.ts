import { create } from "zustand";
import toast from "react-hot-toast";

interface useToastProps {
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
}

export const useToast = create<useToastProps>((set) => ({
  success: (message: string) => {
    toast.success(message, {
      position: "top-right",
      style: { background: "#7FB685" },
      duration: 3000,
    });
  },
  error: (message: string) => {
    toast.error(message, {
      position: "top-right",
      style: { background: "#e64c4c", color: "#ffffff" },
      duration: 3000,
    });
  },
  warning: (message: string) => {
    toast.success(message, {
      position: "top-right",
      style: { background: "#ffbe76" },
      duration: 3000,
    });
  },
}));
