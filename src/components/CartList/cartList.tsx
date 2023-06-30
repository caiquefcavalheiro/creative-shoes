"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import CartCard from "./CartCard/cartCard";
import { useCart } from "@/hooks/CartStates/state";

export default function CartList() {
  const [message, setMessage] = useState("Carregando produtos....");

  const {
    cart,
    actions: { getUserCart },
  } = useCart();

  useEffect(() => {
    setMessage("Carregando produtos....");
    getUserCart();
    setTimeout(() => {
      setMessage("Seu carrinho está vazio");
    }, 3000);
  }, [getUserCart]);

  return cart.length > 0 ? (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="w-[100vw] flex flex-wrap mt-[30px] pt-[30px] h-[75vh] lg:h-[80vh] xl:h-[85vh] gap-8 justify-center content-start overflow-y-auto 3xl:w-[80vw] 3xl:m-margin-60-auto">
      {cart.map((order) => {
        return <CartCard key={order.id} order={order} />;
      })}
    </motion.div>
  ) : (
    <motion.div className="flex justify-center items-center text-4xl text-white h-[70vh] lg:h-[88vh]">
      {message}
    </motion.div>
  );
}
