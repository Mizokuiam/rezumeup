"use client"

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { getPurchaseHistory } from "@/lib/supabase/purchases"
import { formatDate } from "@/lib/utils"
import { Purchase } from "@/lib/types"

export default function PurchaseHistory() {
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPurchases = async () => {
      try {
        const history = await getPurchaseHistory()
        setPurchases(history)
      } catch (error) {
        console.error("Failed to load purchase history:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPurchases()
  }, [])

  if (loading) {
    return <div>Loading purchase history...</div>
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Purchase History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Boosts Purchased</TableHead>
            <TableHead>Amount Paid</TableHead>
            <TableHead>Payment Method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases.map((purchase) => (
            <TableRow key={purchase.id}>
              <TableCell>{formatDate(purchase.created_at)}</TableCell>
              <TableCell>{purchase.boosts} Boosts</TableCell>
              <TableCell>${purchase.amount.toFixed(2)}</TableCell>
              <TableCell>{purchase.payment_method}</TableCell>
            </TableRow>
          ))}
          {purchases.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No purchases found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  )
}