import { NextResponse } from 'next/server';
import { optimizeResume } from '@/lib/ai/resume-optimizer';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getUserBoosts, updateUserBoosts } from '@/lib/supabase/client';
import { validateResumeData } from '@/lib/resume/resume-validator';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Please sign in to optimize your resume' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const boosts = await getUserBoosts(userId);

    if (boosts < 1) {
      return NextResponse.json(
        { error: 'No boosts remaining. Please purchase more boosts to continue.' },
        { status: 403 }
      );
    }

    const formData = await req.json();
    const validationError = validateResumeData(formData);
    
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    const optimizedResume = await optimizeResume(formData);
    
    if (optimizedResume) {
      await updateUserBoosts(userId, boosts - 1);
    }

    return NextResponse.json(optimizedResume);
  } catch (error) {
    console.error('Resume optimization error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to optimize resume' },
      { status: 500 }
    );
  }
}