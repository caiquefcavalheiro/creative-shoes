"use client";

import CreateUserForm from "@/components/Forms/createUser";
import LoginUserForm from "@/components/Forms/loginUser";
import Header from "@/components/Header/header";
import ModalContainer from "@/components/Modal/modalContainer";
import { useModalState } from "@/hooks/ModalStates/state";
import CreateProductForm from "@/components/Forms/createProduct";

export default function Home() {
  const modalState = useModalState();

  return (
    <main className="bg-cover bg-galaxy w-[100vw] h-[100vh]">
      <Header></Header>
      <ModalContainer
        title="Login"
        modalOpen={modalState.loginState}
        setModalOpen={modalState.actions.setLoginState}>
        <LoginUserForm></LoginUserForm>
      </ModalContainer>
      <ModalContainer
        title="Criar Usuário"
        modalOpen={modalState.registerState}
        setModalOpen={modalState.actions.setRegisterState}>
        <CreateUserForm></CreateUserForm>
      </ModalContainer>
      <ModalContainer
        title="Criar Produto"
        modalOpen={modalState.productState}
        setModalOpen={modalState.actions.setProductState}>
        <CreateProductForm></CreateProductForm>
      </ModalContainer>
    </main>
  );
}
