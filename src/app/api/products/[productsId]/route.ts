import { NextResponse } from "next/server";
import { prisma } from "../../../../../db";
import { productSchema } from "@/schemas/products/schema";

interface Params {
  params: {
    productsId: string;
  };
}

async function PATCH(request: Request, { params }: Params) {
  const { productsId } = params;

  const body = await request.json();

  const product = await prisma.product.findFirst({
    where: { id: productsId },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const { name, description, price } = body;

  const updateProduct = await prisma.product.update({
    where: { id: productsId },
    data: {
      name: name !== undefined ? name : product.name,
      description:
        description !== undefined ? description : product.description,
      price: price !== undefined ? price : product.price,
    },
  });

  const productResponse = productSchema.parse(updateProduct);

  return NextResponse.json(productResponse);
}

async function DELETE(request: Request, { params }: Params) {
  const { productsId } = params;

  const product = await prisma.product.findFirst({
    where: { id: productsId },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const deleteProduct = await prisma.product.delete({
    where: { id: productsId },
  });

  return NextResponse.json({ status: 204 });
}

export { PATCH, DELETE };
