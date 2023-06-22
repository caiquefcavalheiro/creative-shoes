import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { userSchemaResponse } from "@/schemas/user/schema";
import { prisma } from "../../../../db";
import jwt from "jsonwebtoken";

async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const user = await prisma.user.findFirst({
    where: { email: email },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Email ou senha estão incorretos" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.compare(password, user.password);

  if (!hashedPassword) {
    return NextResponse.json(
      { message: "Email ou senha estão incorretos" },
      { status: 400 }
    );
  }

  const responseUser = userSchemaResponse.parse(user);

  const token = jwt.sign(responseUser, process.env.SECRET_KEY!);

  return NextResponse.json(token);
}

export { POST };
