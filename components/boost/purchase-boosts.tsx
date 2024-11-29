"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/components/auth/auth-provider'
import { toast } from 'sonner'

const boostPackages = [
  { id: '1', name: '20 Boosts', price: 10, boosts: 20 },
  { id: '2', name: '50 Boosts', price: 25, boosts: 50 },
  { id: '3', name: '100 Boosts', price: 45, boosts: 100 },
]

export default function PurchaseBoosts() {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const handlePurchase = async (packageId: string) => {
    if (!user) {
      toast.error('Please sign in to purchase boosts')
      return
    }
    
    setLoading(true)
    try {
      const response = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId,
          userId: user.id,
        }),
      })

      const { paymentUrl } = await response.json()
      window.location.href = paymentUrl
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to initialize payment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {boostPackages.map((pkg) => (
        <Card key={pkg.id} className="p-6">
          <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
          <p className="text-3xl font-bold mb-4">${pkg.price}</p>
          <Button
            onClick={() => handlePurchase(pkg.id)}
            disabled={loading}
            className="w-full"
          >
            Purchase
          </Button>
        </Card>
      ))}
    </div>
  )
}