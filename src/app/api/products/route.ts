import { NextResponse } from "next/server";
import { prisma } from "../../../../db";
import {
  productSchema,
  productSchemaResponses,
} from "@/schemas/products/schema";

async function GET(request: Request) {
  const products = await prisma.product.findMany();

  const productResponse = productSchemaResponses.parse(products);

  return NextResponse.json(productResponse);
}

async function POST(request: Request) {
  const body = await request.json();
  const { name, description, price } = body;

  const product = await prisma.product.create({
    data: { name, description, price },
  });

  const productResponse = productSchema.parse(product);

  return NextResponse.json(productResponse);
}

export { GET, POST };
