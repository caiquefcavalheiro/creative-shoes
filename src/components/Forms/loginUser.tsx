"use client";

import { useModalState } from "@/hooks/ModalStates/state";
import { useUser } from "@/hooks/UserStates/state";
import { userLogin, userSchemaLogin } from "@/schemas/user/schema";
import { useForm } from "react-hook-form";
import Input from "../Input/input";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginUserForm() {
  const {
    actions: { loginUser },
  } = useUser();

  const modalState = useModalState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLogin>({ resolver: zodResolver(userSchemaLogin) });

  const onSubmit = handleSubmit(async (data: userLogin) => {
    const response = await loginUser(data);
    if (!!response.error) {
      //error (toast)
    } else {
      localStorage.setItem("@token", JSON.stringify(response));
      modalState.actions.setLoginState(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-center gap-7">
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
