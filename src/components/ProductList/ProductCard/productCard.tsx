"use client";

import { useModalState } from "@/hooks/ModalStates/state";
import { useProduct } from "@/hooks/ProductStates/state";
import { productResponse } from "@/schemas/products/schema";
import { motion } from "framer-motion";

interface ProductProps {
  product: productResponse;
}

export default function ProductCard({ product }: ProductProps) {
  const { name, price, image, description } = product;

  const {
    actions: { selectProduct },
  } = useProduct();

  const {
    actions: { setModalProductState },
  } = useModalState();

  return (
    <motion.div
      whileHover={{
        backgroundColor: "#ffffff90",
        scale: 1.05,
      }}
      transition={{ delay: 0.1 }}
      className="bg-white-opacity40 rounded-lg w-[339px] h-[240px] py-4 cursor-pointer">
      <motion.li className="list-none">
        <motion.img
          onClick={() => {
            setModalProductState(true);
            selectProduct(product);
          }}
          className="h-[159px] m-margin-0-auto"
          src={image}
        />
        <motion.div className="flex justify-around items-center">
          <motion.div
            onClick={() => {
              setModalProductState(true);
              selectProduct(product);
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
          <motion.button
            onClick={() => {}}
            className="bg-black-opacity60 text-white p-2 rounded-lg hover:bg-white hover:text-black transition-all font-medium">
            Comprar
          </motion.button>
        </motion.div>
      </motion.li>
    </motion.div>
  );
}
