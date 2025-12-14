import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { MarketData } from "@/lib/mock-data"

interface TopMarketsTableProps {
  markets: MarketData[]
}

export function TopMarketsTable({ markets }: TopMarketsTableProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getRiskVariant = (risk: MarketData["risk"]) => {
    switch (risk) {
      case "Low":
        return "success"
      case "Medium":
        return "warning"
      case "High":
        return "destructive"
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">Top Markets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
                <th className="pb-3 pr-4 font-medium">Market</th>
                <th className="pb-3 pr-4 font-medium">Median Price</th>
                <th className="pb-3 pr-4 font-medium">Growth</th>
                <th className="pb-3 pr-4 font-medium">Days on Market</th>
                <th className="pb-3 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {markets.map((market) => (
                <tr
                  key={`${market.city}-${market.state}`}
                  className="border-b border-border last:border-0"
                >
                  <td className="py-3 pr-4">
                    <div className="font-medium">
                      {market.city}, {market.state}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {market.inventory.toLocaleString()} listings
                    </div>
                  </td>
                  <td className="py-3 pr-4 font-medium">
                    {formatPrice(market.medianPrice)}
                  </td>
                  <td className="py-3 pr-4">
                    <div
                      className={cn(
                        "flex items-center gap-1",
                        market.growth >= 0 ? "text-success" : "text-destructive"
                      )}
                    >
                      {market.growth >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span>
                        {market.growth > 0 ? "+" : ""}
                        {market.growth}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {market.daysOnMarket} days
                  </td>
                  <td className="py-3">
                    <Badge variant={getRiskVariant(market.risk)}>
                      {market.risk}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

