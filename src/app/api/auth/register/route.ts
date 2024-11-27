import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/db/prisma";

// Create a User interface for type safety in the response
interface User {
  id: string;
  email: string;
  name: string | null;
}

interface ErrorResponse {
  error: string;
}

export async function POST(req: Request): Promise<NextResponse<ErrorResponse | { user: User }>> {
  try {
    const { email, password, name }: { email: string; password: string; name: string } = await req.json();

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
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Error creating user" },
      { status: 500 }
    );
  }
}
