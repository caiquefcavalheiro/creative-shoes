"use client";

import CartList from "@/components/CartList/cartList";
import Header from "@/components/Header/header";
import ModalContainer from "@/components/Modal/modalContainer";
import ProductDetails from "@/components/ProductList/ProductDetails/productDetails";
import { useModalState } from "@/hooks/ModalStates/state";

export default function CartPage() {
  const modalState = useModalState();

  return (
    <main className="bg-cover bg-galaxy w-[100vw] h-[100vh] relative">
      <Header></Header>
      <CartList />
      <ModalContainer
        title="Detalhes do Produto"
        modalOpen={modalState.productModalState}
        setModalOpen={modalState.actions.setModalProductState}>
        <ProductDetails></ProductDetails>
      </ModalContainer>
    </main>
  );
}
