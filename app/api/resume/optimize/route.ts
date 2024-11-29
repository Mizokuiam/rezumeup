import { NextResponse } from 'next/server';
import { optimizeResume } from '@/lib/ai/resume-optimizer';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getUserBoosts, updateUserBoosts } from '@/lib/supabase/client';

export async function POST(req: Request) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const boosts = await getUserBoosts(userId);

    if (boosts < 1) {
      return NextResponse.json(
        { error: 'No boosts remaining' },
        { status: 403 }
      );
    }

    const formData = await req.json();
    const optimizedResume = await optimizeResume(formData);
    
    // Deduct one boost
    await updateUserBoosts(userId, boosts - 1);

    return NextResponse.json(optimizedResume);
  } catch (error) {
    console.error('Resume optimization error:', error);
    return NextResponse.json(
      { error: 'Failed to optimize resume' },
      { status: 500 }
    );
  }
}