"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const boostPackages = [
  { id: '1', name: '20 Boosts', price: 10, boosts: 20 },
  { id: '2', name: '50 Boosts', price: 25, boosts: 50 },
  { id: '3', name: '100 Boosts', price: 45, boosts: 100 },
]

export function UpgradeDialog({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handlePurchase = async (packageId: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ packageId }),
      })

      const { paymentUrl } = await response.json()
      window.location.href = paymentUrl
    } catch (error) {
      toast.error('Failed to initialize payment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upgrade Your Plan</DialogTitle>
          <DialogDescription>
            Choose a boost package that suits your needs
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {boostPackages.map((pkg) => (
            <Card key={pkg.id} className="p-4">
              <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
              <p className="text-2xl font-bold mb-4">${pkg.price}</p>
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
      </DialogContent>
    </Dialog>
  )
}