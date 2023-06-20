import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { userSchemaResponse } from "@/schemas/user/schema";
import { prisma } from "../../../../db";

async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const user = await prisma.user.findFirst({
    where: { email: email },
  });

  if (!user) {
    return NextResponse.json({ error: "name or password are incorrect" });
  }

  const hashedPassword = await bcrypt.compare(password, user.password);

  if (!hashedPassword) {
    return NextResponse.json({ error: "name or password are incorrect" });
  }

  const responseUser = userSchemaResponse.parse(user);
  return NextResponse.json(responseUser);
}

export { POST };
