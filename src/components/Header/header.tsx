"use client";

import { useModalState } from "@/hooks/ModalStates/state";
import { useCallback, useEffect, useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { FaShoppingCart } from "react-icons/fa";
import { useProduct } from "@/hooks/ProductStates/state";
import { parseCookies, destroyCookie } from "nookies";
import { useCart } from "@/hooks/CartStates/state";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const modalState = useModalState();
  const router = useRouter();
  const path = usePathname();

  const { "creative-shoes": token } = parseCookies();

  const {
    actions: { getProcutsByName, getProducts },
  } = useProduct();

  const {
    cartQuantity,
    actions: { getUserCart },
  } = useCart();

  const handleSearch = useCallback(() => {
    if (search) {
      getProcutsByName(search);
    } else {
      getProducts();
    }
  }, [getProcutsByName, getProducts, search]);

  useEffect(() => {
    getUserCart();
  }, [getUserCart]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, handleSearch]);

  return (
    <header className="gap-4 flex flex-col lg:flex-row center justify-around bg-transparent w-full p-4">
      <h1
        className="text-[2rem] text-center font-bold text-white cursor-pointer"
        onClick={() => {
          router.push("/");
        }}>
        Creative Store Shoes
      </h1>
      {path === "/" ? (
        <div className="flex justify-center">
          <input
            onChange={(event) => setSearch(event.target.value)}
            className="p-3 min-w-[250px] max-w-[600px] rounded-lg text-center text-sm placeholder-black"
            type="text"
            placeholder="O que está procurando..."
          />
        </div>
      ) : (
        <></>
      )}
      <div className="flex items-center w-full lg:max-w-[400px] justify-evenly gap-3 cursor-pointer">
        <div
          className="relative"
          onClick={() => {
            if (token) {
              router.push("/cart");
            } else {
              modalState.actions.setLoginState(true);
            }
          }}>
          <FaShoppingCart color={"#ffffff"} size={40}></FaShoppingCart>
          <span className="absolute top-[-5px] right-[-5px] text-white bg-red-600 rounded-full px-[1px] text-xs">
            {cartQuantity}
          </span>
        </div>
        {path === "/cart" ? (
          <div
            className="bg-white-opacity80 p-4 rounded-lg text-black font-medium"
            onClick={() => {
              router.push("/");
            }}>
            Pagina Inicial
          </div>
        ) : (
          <></>
        )}
        <div
          className="relative flex items-center justify-center"
          onClick={() => setMenuOpen((state) => !state)}>
          <TiThMenu color={"#ffffff"} size={40}></TiThMenu>
          {menuOpen ? (
            <menu
              className={`${
                menuOpen ? "flex" : "hidden"
              } absolute flex-col w-[200px] top-12 lg:right-auto animate-menu-open z-10`}>
              {!token ? (
                <>
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
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      if (path === "/") {
                        router.push("/cart");
                      } else {
                        router.push("/");
                      }
                    }}
                    className="p-2 bg-black-opacity90 text-white rounded-t-lg border-b-2 solid border-white">
                    {path === "/" ? "Carrinho" : "Pagina Principal"}
                  </button>
                  <button
                    onClick={() => {
                      destroyCookie(undefined, "creative-shoes");
                      getUserCart();
                      router.push("/");
                    }}
                    className="p-2 bg-black-opacity90 text-white rounded-b-lg">
                    Sair da Conta
                  </button>
                </>
              )}
            </menu>
          ) : (
            <></>
          )}
        </div>
      </div>
    </header>
  );
}
