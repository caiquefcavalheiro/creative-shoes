"use client";

import { useProduct } from "@/hooks/ProductStates/state";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const {
    state: { product },
  } = useProduct();

  return (
    <motion.div>
      <motion.div className="flex flex-col gap-4">
        <motion.img whileHover={{ scale: 1.1 }} src={product.image} />
        <motion.p className="bg-black-opacity95 text-white text-lg rounded text-center font-semibold">
          {product.name}
        </motion.p>
        <motion.p className="bg-black-opacity95 p-4 rounded-lg text-justify text-white">
          {product.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
