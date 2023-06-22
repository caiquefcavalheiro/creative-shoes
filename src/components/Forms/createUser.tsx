"use client";

import { useModalState } from "@/hooks/ModalStates/state";
import { useUser } from "@/hooks/UserStates/state";
import { userRegister, userSchemaRegister } from "@/schemas/user/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input/input";
import { useToast } from "@/hooks/ToastStates/state";

export default function CreateUserForm() {
  const {
    actions: { createUser },
  } = useUser();

  const { success, error } = useToast();

  const modalState = useModalState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userRegister>({ resolver: zodResolver(userSchemaRegister) });

  const onSubmit = handleSubmit(async (data: userRegister) => {
    try {
      await createUser(data);
      success("Conta criada com sucesso");
    } catch (err) {
      if (err instanceof Error) {
        error(err.message);
      }
    }
    modalState.actions.setRegisterState(false);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-center gap-7">
      <Input
        register={register}
        labelText="Nome"
        placeholder="Digite seu nome de usuário..."
        registerInput="name"
        type="text"
        errors={errors}
      />
      <Input
        placeholder="Digite o seu email..."
        register={register}
        registerInput="email"
        labelText="Email"
        type="email"
        errors={errors}
      />
      <Input
        placeholder="Digite a sua senha..."
        register={register}
        registerInput="password"
        type="password"
        labelText="Senha"
        errors={errors}
      />
      <Input
        placeholder="Digite a sua senha novamente..."
        register={register}
        registerInput="confirmPassword"
        type="password"
        labelText="Confirmar Senha"
        errors={errors}
      />
      <button
        className="bg-gray-300 py-2 rounded-lg text-black hover:text-white hover:bg-black transition-all"
        type="submit">
        Registrar usuário
      </button>
    </form>
  );
}
