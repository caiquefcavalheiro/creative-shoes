"use client";

import { useCart } from "@/hooks/CartStates/state";
import { useModalState } from "@/hooks/ModalStates/state";
import { useProduct } from "@/hooks/ProductStates/state";
import { useToast } from "@/hooks/ToastStates/state";
import { orderResponse } from "@/schemas/order/schema";
import { motion } from "framer-motion";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoIosRemoveCircleOutline } from "react-icons/io";

interface ProductProps {
  order: orderResponse;
}

export default function CartCard({ order }: ProductProps) {
  const { id, name, price, image } = order.product;

  const { error, warning } = useToast();

  const {
    actions: { selectProduct },
  } = useProduct();

  const {
    actions: { setModalProductState },
  } = useModalState();

  const {
    actions: { addToCart, deleteProductCart },
  } = useCart();

  const handleBuy = async () => {
    try {
      await addToCart(id);
      warning("Produto adicionado ao carrinho");
    } catch (err) {
      if (err instanceof Error) {
        error(err.message);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProductCart(id);
      warning("Produto removido do carrinho");
    } catch (err) {
      if (err instanceof Error) {
        error(err.message);
      }
    }
  };

  return (
    <motion.div
      whileHover={{
        backgroundColor: "#ffffff90",
        scale: 1.05,
      }}
      transition={{ delay: 0.1 }}
      className="bg-white-opacity40 rounded-lg w-[339px] h-[240px] py-4 cursor-pointer hover:neon-blue">
      <motion.li className="list-none">
        <motion.img
          onClick={() => {
            setModalProductState(true);
            selectProduct(order.product);
          }}
          className="h-[159px] m-margin-0-auto"
          src={image}
        />
        <motion.div className="flex justify-around items-center">
          <motion.div
            onClick={() => {
              setModalProductState(true);
              selectProduct(order.product);
            }}
            className="flex flex-col justify-center item">
            <motion.p className="text-black text-base font-medium">
              {name}
            </motion.p>
            <motion.p className="text-black text-base font-medium">
              {price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </motion.p>
          </motion.div>
          <motion.p
            className="text-black text-2xl font-medium"
            onClick={() => {
              setModalProductState(true);
              selectProduct(order.product);
            }}>
            {order.quantity}
          </motion.p>
          <motion.div className="flex gap-2">
            <motion.button
              onClick={handleBuy}
              className="bg-black-opacity60 text-white p-2 rounded-lg hover:bg-white hover:text-black transition-all font-medium">
              <AiOutlinePlusCircle size={26} />
            </motion.button>
            <motion.button
              onClick={handleDelete}
              className="bg-black-opacity60 text-white p-2 rounded-lg hover:bg-white hover:text-black transition-all font-medium">
              <IoIosRemoveCircleOutline size={26} />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.li>
    </motion.div>
  );
}
