import { useProduct } from "@/hooks/ProductStates/state";
import { useEffect } from "react";
import ProductCard from "./ProductCard/productCard";

import { motion } from "framer-motion";

export default function ProductList() {
  const {
    state: { products },
    actions: { getProducts },
  } = useProduct();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return products.length > 0 ? (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="w-[100vw] flex flex-wrap mt-[30px] pt-[30px] h-[75vh] lg:h-[80vh] xl:h-[85vh] gap-8 justify-center content-start overflow-y-auto 3xl:w-[80vw] 3xl:m-margin-60-auto">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </motion.div>
  ) : (
    <motion.div className="flex justify-center items-center text-4xl text-white h-[70vh] lg:h-[88vh]">
      Carregando produtos....
    </motion.div>
  );
}
