"use client"

import { useEffect, useState } from 'react';
import { getUserBoosts } from '@/lib/supabase/client';
import { useAuth } from '@/components/auth/hooks/use-auth';
import { Zap } from 'lucide-react';

export function BoostCounter() {
  const { user } = useAuth();
  const [boosts, setBoosts] = useState<number>(0);

  useEffect(() => {
    if (user?.id) {
      getUserBoosts(user.id)
        .then(count => setBoosts(count))
        .catch(console.error);
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      <Zap className="h-4 w-4" />
      <span>{boosts} Boosts</span>
    </div>
  );
}