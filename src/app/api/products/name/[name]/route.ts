import { NextResponse } from "next/server";
import { prisma } from "../../../../../../db";

interface Params {
  params: {
    name: string;
  };
}

async function GET(request: Request, { params }: Params) {
  const { name } = params;

  console.log(name);

  const products = await prisma.product.findMany({
    where: { name: { contains: name, mode: "insensitive" } },
  });

  if (products.length < 0) {
    return NextResponse.json(
      { message: "Nenhum produto com esse nome foi encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(products);
}

export { GET };
