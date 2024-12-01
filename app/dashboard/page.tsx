import { redirect } from 'next/navigation'
import PurchaseBoosts from '@/components/boost/purchase-boosts'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth')
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Purchase Boosts</h2>
        <PurchaseBoosts />
      </div>
    </div>
  )
}