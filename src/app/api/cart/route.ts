import { NextResponse } from "next/server";
import { prisma } from "../../../../db";
import jwt from "jsonwebtoken";
import { userResponse } from "@/schemas/user/schema";

async function GET(request: Request) {
  let user = {} as userResponse;

  const token = request.headers.get("authorization");

  if (token) {
    jwt.verify(
      `${token}`,
      process.env.SECRET_KEY!,
      (error: any, decoded: any) => {
        user = { id: decoded.id, name: decoded.name, email: decoded.email };
      }
    );

    if (token) {
      const verifyUser = await prisma.user.findFirst({
        where: { id: user.id },
        include: { Order: true },
      });

      const userOrders = await prisma.orderProduct.findMany({
        where: { orderId: verifyUser?.Order?.id },
        include: { product: true },
        orderBy: { quantity: "desc" },
      });

      return NextResponse.json(userOrders);
    }
  }

  return NextResponse.json([]);
}

export { GET };
