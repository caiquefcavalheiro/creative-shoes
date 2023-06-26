import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "../../../../db";
import { userSchemaResponse, usersSchemaResponse } from "@/schemas/user/schema";

async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  const emailInUse = await prisma.user.findFirst({ where: { email: email } });

  if (emailInUse) {
    return NextResponse.json(
      { message: "Este email já está em uso" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  const responseUser = userSchemaResponse.parse(user);

  await prisma.order.create({
    data: {
      quantity: 0,
      totalPrice: 0,
      user: { connect: { id: user.id } },
    },
  });

  return NextResponse.json(responseUser, { status: 201 });
}

async function GET(request: Request) {
  const users = await prisma.user.findMany();

  const responseUsers = usersSchemaResponse.parse(users);

  return NextResponse.json(responseUsers);
}

export { POST, GET };
