import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { MacroIndicator } from "@/lib/mock-data"

interface MacroIndicatorsProps {
  indicators: MacroIndicator[]
}

export function MacroIndicators({ indicators }: MacroIndicatorsProps) {
  const getTrendIcon = (trend: MacroIndicator["trend"]) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4" />
      case "down":
        return <TrendingDown className="h-4 w-4" />
      default:
        return <Minus className="h-4 w-4" />
    }
  }

  const getTrendColor = (trend: MacroIndicator["trend"], name: string) => {
    // Context-aware coloring: for inflation and unemployment, down is good
    const downIsGood = name.includes("CPI") || name.includes("Unemployment")
    
    if (trend === "stable") return "text-muted-foreground"
    if (trend === "up") {
      return downIsGood ? "text-destructive" : "text-success"
    }
    return downIsGood ? "text-success" : "text-destructive"
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">Macro Indicators</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {indicators.map((indicator) => (
            <div
              key={indicator.name}
              className="flex items-center justify-between rounded-lg border border-border p-3"
            >
              <div>
                <p className="text-sm text-muted-foreground">{indicator.name}</p>
                <p className="text-lg font-semibold">
                  {indicator.value}
                  {indicator.unit}
                </p>
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 text-sm",
                  getTrendColor(indicator.trend, indicator.name)
                )}
              >
                {getTrendIcon(indicator.trend)}
                <span>
                  {indicator.change > 0 ? "+" : ""}
                  {indicator.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

