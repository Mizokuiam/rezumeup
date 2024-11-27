import { supabase } from '@/lib/supabase';
import prisma from '@/lib/prisma';

export async function POST(req) {
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
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
