import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  unit?: string
  trend?: number
  trendLabel?: string
  icon: LucideIcon
  variant?: "default" | "success" | "warning" | "danger"
}

export function MetricCard({
  title,
  value,
  unit,
  trend,
  trendLabel,
  icon: Icon,
  variant = "default",
}: MetricCardProps) {
  const getTrendIcon = () => {
    if (!trend) return <Minus className="h-3 w-3" />
    return trend > 0 ? (
      <TrendingUp className="h-3 w-3" />
    ) : (
      <TrendingDown className="h-3 w-3" />
    )
  }

  const getTrendColor = () => {
    if (!trend) return "text-muted-foreground"
    // For some metrics, down is good (like rates going down)
    if (variant === "danger") {
      return trend > 0 ? "text-destructive" : "text-success"
    }
    return trend > 0 ? "text-success" : "text-destructive"
  }

  const getIconColor = () => {
    switch (variant) {
      case "success":
        return "bg-success/10 text-success"
      case "warning":
        return "bg-warning/10 text-warning"
      case "danger":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-primary/10 text-primary"
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">{value}</span>
              {unit && (
                <span className="text-lg text-muted-foreground">{unit}</span>
              )}
            </div>
            {trend !== undefined && (
              <div className={cn("flex items-center gap-1 text-xs", getTrendColor())}>
                {getTrendIcon()}
                <span>
                  {trend > 0 ? "+" : ""}
                  {trend}%
                </span>
                {trendLabel && (
                  <span className="text-muted-foreground">{trendLabel}</span>
                )}
              </div>
            )}
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl",
              getIconColor()
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

