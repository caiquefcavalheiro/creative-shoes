"use client";

import { useModalState } from "@/hooks/ModalStates/state";
import { useUser } from "@/hooks/UserStates/state";
import { userLogin, userSchemaLogin } from "@/schemas/user/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/ToastStates/state";
import { useForm } from "react-hook-form";
import Input from "../Input/input";

export default function LoginUserForm() {
  const {
    actions: { loginUser },
  } = useUser();

  const { success, error } = useToast();

  const modalState = useModalState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLogin>({ resolver: zodResolver(userSchemaLogin) });

  const onSubmit = handleSubmit(async (data: userLogin) => {
    try {
      const response = await loginUser(data);
      localStorage.setItem("@token", JSON.stringify(response));
      modalState.actions.setLoginState(false);
      success("Logado com sucesso");
    } catch (err) {
      if (err instanceof Error) {
        error(err.message);
      }
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center gap-7 animate-modal-appear">
      <Input
        type="text"
        placeholder="Digite seu email"
        errors={errors}
        labelText="Email"
        register={register}
        registerInput="email"
      />
      <Input
        type="password"
        placeholder="Digite sua senha"
        errors={errors}
        labelText="Senha"
        register={register}
        registerInput="password"
      />
      <button
        className="bg-gray-300 py-2 rounded-lg text-black hover:text-white hover:bg-black transition-all"
        type="submit">
        Login
      </button>
    </form>
  );
}
