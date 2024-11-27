import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    const exists = await prisma.user.findUnique({
      where: { email }
    });

    if (exists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        boosts: 3
      }
    });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating user" },
      { status: 500 }
    );
  }
}