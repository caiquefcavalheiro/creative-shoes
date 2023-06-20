"use client";

import { useModalState } from "@/hooks/ModalStates/state";
import { useUser } from "@/hooks/UserStates/state";
import { userLogin } from "@/schemas/user/schema";
import { useForm } from "react-hook-form";

export default function LoginUserForm() {
  const {
    actions: { loginUser },
  } = useUser();

  const modalState = useModalState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLogin>();

  const onSubmit = handleSubmit(async (data: userLogin) => {
    const token = await loginUser(data);
    if (token) {
      modalState.actions.setLoginState(false);
    }
  });

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <input
        required
        type="text"
        placeholder="digite seu email"
        {...register("email")}
      />
      <input
        required
        type="password"
        placeholder="digite sua senha"
        {...register("password")}
      />
      <button type="submit">Login</button>
    </form>
  );
}
