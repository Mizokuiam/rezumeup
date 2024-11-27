import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        boosts: 3, // Initial free boosts
      },
    });

    const token = generateToken(user.id);

    return NextResponse.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}