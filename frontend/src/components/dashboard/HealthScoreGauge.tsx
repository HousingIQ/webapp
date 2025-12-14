import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface HealthScoreGaugeProps {
  score: number
  trend: number
}

export function HealthScoreGauge({ score, trend }: HealthScoreGaugeProps) {
  // Calculate the arc for the gauge
  const radius = 80
  const strokeWidth = 12
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * Math.PI // Half circle
  const strokeDashoffset = circumference - (score / 100) * circumference

  const getScoreColor = () => {
    if (score >= 70) return "text-success"
    if (score >= 40) return "text-warning"
    return "text-destructive"
  }

  const getScoreLabel = () => {
    if (score >= 70) return "Healthy"
    if (score >= 40) return "Moderate"
    return "At Risk"
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">National Housing Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative">
            <svg
              height={radius + 20}
              width={radius * 2}
              className="overflow-visible"
            >
              {/* Background arc */}
              <path
                d={`M ${strokeWidth / 2} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth / 2} ${radius}`}
                fill="none"
                stroke="currentColor"
                className="text-muted"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              {/* Foreground arc */}
              <path
                d={`M ${strokeWidth / 2} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth / 2} ${radius}`}
                fill="none"
                stroke="currentColor"
                className={getScoreColor()}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transition: "stroke-dashoffset 0.5s ease-in-out",
                }}
              />
            </svg>
            {/* Score text */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
              <span className={cn("text-4xl font-bold", getScoreColor())}>
                {score}
              </span>
              <span className="text-sm text-muted-foreground">/ 100</span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className={cn("text-sm font-medium", getScoreColor())}>
              {getScoreLabel()}
            </span>
            <span
              className={cn(
                "text-xs",
                trend > 0 ? "text-success" : "text-destructive"
              )}
            >
              {trend > 0 ? "+" : ""}
              {trend}% vs last month
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

