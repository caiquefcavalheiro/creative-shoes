import { NextResponse } from "next/server";
import { userResponse } from "@/schemas/user/schema";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../../db";

interface Params {
  params: {
    productId: string;
  };
}

async function POST(request: Request, { params }: Params) {
  const { productId } = params;

  const token = request.headers.get("authorization");

  let user = {} as userResponse;

  jwt.verify(
    `${token}`,
    process.env.SECRET_KEY!,
    (error: any, decoded: any) => {
      user = { id: decoded.id, name: decoded.name, email: decoded.email };
    }
  );

  const verifyUser = await prisma.user.findFirst({
    where: { id: user.id },
    include: { Order: true },
  });

  if (!verifyUser) {
    return NextResponse.json({ message: "Token inválido" }, { status: 404 });
  }

  const product = await prisma.product.findFirst({ where: { id: productId } });

  if (!product) {
    return NextResponse.json(
      { message: "Produto com este ID não foi encontrado" },
      { status: 404 }
    );
  }

  const verifyProductOrder = await prisma.orderProduct.findFirst({
    where: { orderId: verifyUser.Order?.id, productId: product.id },
  });

  if (!verifyProductOrder) {
    await prisma.orderProduct.create({
      data: { orderId: verifyUser.Order?.id, productId: product.id },
    });
  } else {
    await prisma.orderProduct.update({
      where: { id: verifyProductOrder.id },
      data: { quantity: verifyProductOrder.quantity + 1 },
    });
  }

  const responseOrder = await prisma.orderProduct.findMany({
    where: { orderId: verifyUser.Order?.id },
    include: { product: true },
    orderBy: { quantity: "desc" },
  });

  return NextResponse.json(responseOrder);
}

async function DELETE(request: Request, { params }: Params) {
  const { productId } = params;

  const token = request.headers.get("authorization");

  let user = {} as userResponse;

  jwt.verify(
    `${token}`,
    process.env.SECRET_KEY!,
    (error: any, decoded: any) => {
      user = { id: decoded.id, name: decoded.name, email: decoded.email };
    }
  );

  const verifyUser = await prisma.user.findFirst({
    where: { id: user.id },
    include: { Order: true },
  });

  if (!verifyUser) {
    return NextResponse.json({ message: "Token inválido" }, { status: 404 });
  }

  const product = await prisma.product.findFirst({ where: { id: productId } });

  if (!product) {
    return NextResponse.json(
      { message: "Produto com este ID não foi encontrado" },
      { status: 404 }
    );
  }

  const verifyProductOrder = await prisma.orderProduct.findFirst({
    where: { orderId: verifyUser.Order?.id, productId: product.id },
  });

  if (!verifyProductOrder) {
    return NextResponse.json({
      message: "Este produto não está no seu carrinho",
    });
  } else {
    if (verifyProductOrder.quantity > 1) {
      await prisma.orderProduct.update({
        where: { id: verifyProductOrder.id },
        data: { quantity: verifyProductOrder.quantity - 1 },
      });
    } else {
      await prisma.orderProduct.delete({
        where: { id: verifyProductOrder.id },
      });
    }
  }

  const responseOrder = await prisma.orderProduct.findMany({
    where: { orderId: verifyUser.Order?.id },
    include: { product: true },
    orderBy: { quantity: "desc" },
  });

  return NextResponse.json(responseOrder);
}

export { POST, DELETE };
