"use client";

import { useModalState } from "@/hooks/ModalStates/state";
import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const modalState = useModalState();

  return (
    <header className="gap-4 flex flex-col lg:flex-row center justify-around bg-transparent w-full p-4">
      <h1 className="text-[2rem] text-center font-bold text-white">
        Creative Store Shoes
      </h1>
      <div className="flex justify-center">
        <input
          className="p-3 min-w-[250px] max-w-[600px] rounded-lg text-center text-sm placeholder-black"
          type="text"
          placeholder="O que está procurando..."
        />
      </div>
      <div className="flex items-center w-full lg:w-48 justify-evenly gap-3 cursor-pointer">
        <div className="relative">
          <FaShoppingCart color={"#ffffff"} size={40}></FaShoppingCart>
          {/* Colocar a logica para caso exista um produto no carrinho adicionar a quantidade */}
          <span className="absolute top-[-5px] right-[-5px] text-white bg-red-600 rounded-full px-[1px] text-xs">
            0
          </span>
        </div>
        <div
          className="relative flex items-center justify-center"
          onClick={() => setMenuOpen((state) => !state)}>
          <TiThMenu color={"#ffffff"} size={40}></TiThMenu>
          {menuOpen ? (
            <menu
              className={`${
                menuOpen ? "flex" : "hidden"
              } absolute flex-col w-[200px] top-12 lg:right-auto animate-menu-open z-10`}>
              <button
                onClick={() => {
                  modalState.actions.setRegisterState(true);
                }}
                className="p-2 bg-black-opacity90 text-white border-b-2 solid border-white rounded-t-lg">
                Criar Conta
              </button>
              <button
                onClick={() => modalState.actions.setLoginState(true)}
                className="p-2 bg-black-opacity90 text-white rounded-b-lg">
                Fazer Login
              </button>
            </menu>
          ) : (
            <></>
          )}
        </div>
      </div>
    </header>
  );
}
