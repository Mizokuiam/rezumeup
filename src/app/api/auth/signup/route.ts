import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Supabase signup
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  // Add user to Prisma database
  try {
    const newUser = await prisma.user.create({
      data: { email, password }, // Ideally, hash the password before saving
    });
    return new Response(JSON.stringify({ user: newUser }), { status: 201 });
  } catch (err) {
    const error = err as Error;
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
