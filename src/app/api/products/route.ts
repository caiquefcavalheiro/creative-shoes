import { NextResponse } from "next/server";
import { prisma } from "../../../../db";
import {
  productSchemaResponse,
  productSchemaResponses,
} from "@/schemas/products/schema";

async function GET(request: Request) {
  const products = await prisma.product.findMany();

  const productResponse = productSchemaResponses.parse(products);

  return NextResponse.json(productResponse);
}

async function POST(request: Request) {
  const body = await request.json();
  const { name, description, price, image } = body;

  const findProductName = await prisma.product.findFirst({
    where: { name: name },
  });

  if (findProductName) {
    return NextResponse.json(
      { message: "Este nome de produto já está em uso" },
      { status: 400 }
    );
  }

  const product = await prisma.product.create({
    data: { name, description, price, image },
  });

  const productResponse = productSchemaResponse.parse(product);

  return NextResponse.json(productResponse, { status: 201 });
}

export { GET, POST };
