"use client";

import { useModalState } from "@/hooks/ModalStates/state";
import { useProduct } from "@/hooks/ProductStates/state";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useClodinaryState } from "@/hooks/CloudinaryStates/state";
import { useToast } from "@/hooks/ToastStates/state";
import Input from "../Input/input";
import {
  productRegister,
  productSchemaRegister,
} from "@/schemas/products/schema";

export default function CreateProductForm() {
  const {
    actions: { createProduct, patchProduct },
  } = useProduct();

  const {
    actions: { uploadImage },
  } = useClodinaryState();

  const { success, error } = useToast();

  const modalState = useModalState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<productRegister>({
    resolver: zodResolver(productSchemaRegister),
  });

  const onSubmit = handleSubmit(async (data: productRegister) => {
    try {
      const product = await createProduct({ ...data, image: "" });
      const image = await uploadImage(data.image);
      await patchProduct(product.id, { image });
      success("Produto registrado com sucesso");
    } catch (err) {
      if (err instanceof Error) {
        error(err.message);
      }
    }
    modalState.actions.setRegisterState(false);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center gap-7 animate-modal-appear">
      <Input
        register={register}
        labelText="Nome"
        placeholder="Digite o nome do seu produto..."
        registerInput="name"
        type="text"
        errors={errors}
      />
      <Input
        placeholder="Digite a descrição do produto..."
        register={register}
        registerInput="description"
        labelText="Descrição"
        type="text"
        errors={errors}
      />
      <Input
        placeholder="Digite o valor do produto..."
        register={register}
        registerInput="price"
        type="number"
        labelText="Preço"
        errors={errors}
      />
      <Input
        placeholder="Adicione a imagem do produto..."
        register={register}
        registerInput="image"
        type="file"
        labelText="Imagem"
        accept="image/*"
        errors={errors}
      />
      <button
        className="bg-gray-300 py-2 rounded-lg text-black hover:text-white hover:bg-black transition-all"
        type="submit">
        Registrar produto
      </button>
    </form>
  );
}
