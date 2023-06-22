import { NextResponse } from "next/server";
import { prisma } from "../../../../../db";
import {
  productSchema,
  productSchemaResponse,
} from "@/schemas/products/schema";

interface Params {
  params: {
    productsId: string;
  };
}

async function GET(request: Request, { params }: Params) {
  const { productsId } = params;

  const product = await prisma.product.findFirst({
    where: { id: productsId },
  });

  if (!product) {
    return NextResponse.json(
      { message: "Produto não encontrado" },
      { status: 404 }
    );
  }

  const productResponse = productSchema.parse(product);

  return NextResponse.json(productResponse);
}

async function PATCH(request: Request, { params }: Params) {
  const { productsId } = params;

  const body = await request.json();

  const product = await prisma.product.findFirst({
    where: { id: productsId },
  });

  if (!product) {
    return NextResponse.json(
      { message: "Produto não encontrado" },
      { status: 404 }
    );
  }

  const { name, description, price, image } = body;

  const updateProduct = await prisma.product.update({
    where: { id: productsId },
    data: {
      name: name !== undefined ? name : product.name,
      description:
        description !== undefined ? description : product.description,
      price: price !== undefined ? price : product.price,
      image: image !== undefined ? image : product.image,
    },
  });

  const productResponse = productSchemaResponse.parse(updateProduct);

  return NextResponse.json(productResponse);
}

async function DELETE(request: Request, { params }: Params) {
  const { productsId } = params;

  const product = await prisma.product.findFirst({
    where: { id: productsId },
  });

  if (!product) {
    return NextResponse.json(
      { message: "Produto não encontrado" },
      { status: 404 }
    );
  }

  await prisma.product.delete({
    where: { id: productsId },
  });

  return NextResponse.json({ status: 204 });
}

export { GET, PATCH, DELETE };
