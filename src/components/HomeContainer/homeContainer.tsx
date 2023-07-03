"use client";

import { useModalState } from "@/hooks/ModalStates/state";
import CreateProductForm from "../Forms/createProduct";
import CreateUserForm from "../Forms/createUser";
import LoginUserForm from "../Forms/loginUser";
import ModalContainer from "../Modal/modalContainer";
import ProductDetails from "../ProductList/ProductDetails/productDetails";

export default function HomeContainer() {
  const modalState = useModalState();

  return (
    <>
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
      <ModalContainer
        title="Detalhes do Produto"
        modalOpen={modalState.productModalState}
        setModalOpen={modalState.actions.setModalProductState}>
        <ProductDetails></ProductDetails>
      </ModalContainer>
    </>
  );
}
