import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardData } from "@/lib/mock-data"

interface PriceTrendsChartProps {
  data: DashboardData["priceTrends"]
}

export function PriceTrendsChart({ data }: PriceTrendsChartProps) {
  // Find min and max for scaling
  const allValues = data.flatMap((d) => [d.national, d.forecast].filter(Boolean) as number[])
  const minValue = Math.min(...allValues) * 0.95
  const maxValue = Math.max(...allValues) * 1.02
  const range = maxValue - minValue

  const getY = (value: number) => {
    return 100 - ((value - minValue) / range) * 100
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
      notation: "compact",
    }).format(price)
  }

  // Create SVG path for the lines
  const createPath = (points: { x: number; y: number }[]) => {
    return points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ")
  }

  const nationalPoints = data
    .filter((d) => d.national)
    .map((d, i, arr) => ({
      x: (i / (arr.length - 1)) * 100,
      y: getY(d.national),
    }))

  const forecastPoints = data
    .filter((d) => d.forecast)
    .map((d, i) => {
      const startIndex = data.findIndex((item) => item.forecast)
      return {
        x: ((startIndex + i) / (data.length - 1)) * 100,
        y: getY(d.forecast!),
      }
    })

  // Add a connecting point from national to forecast
  if (forecastPoints.length > 0 && nationalPoints.length > 0) {
    const lastNational = nationalPoints[nationalPoints.length - 1]
    forecastPoints.unshift({ x: lastNational.x, y: lastNational.y })
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">National Price Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-64">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 flex h-full flex-col justify-between text-xs text-muted-foreground">
            <span>{formatPrice(maxValue)}</span>
            <span>{formatPrice((maxValue + minValue) / 2)}</span>
            <span>{formatPrice(minValue)}</span>
          </div>

          {/* Chart area */}
          <div className="ml-12 h-full">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              {/* Grid lines */}
              <line
                x1="0"
                y1="0"
                x2="100"
                y2="0"
                stroke="currentColor"
                className="text-border"
                strokeWidth="0.2"
              />
              <line
                x1="0"
                y1="50"
                x2="100"
                y2="50"
                stroke="currentColor"
                className="text-border"
                strokeWidth="0.2"
              />
              <line
                x1="0"
                y1="100"
                x2="100"
                y2="100"
                stroke="currentColor"
                className="text-border"
                strokeWidth="0.2"
              />

              {/* National trend line */}
              <path
                d={createPath(nationalPoints)}
                fill="none"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Forecast trend line (dashed) */}
              {forecastPoints.length > 0 && (
                <path
                  d={createPath(forecastPoints)}
                  fill="none"
                  stroke="currentColor"
                  className="text-chart-2"
                  strokeWidth="0.8"
                  strokeDasharray="2 1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Data points */}
              {nationalPoints.map((point, i) => (
                <circle
                  key={`national-${i}`}
                  cx={point.x}
                  cy={point.y}
                  r="1"
                  fill="currentColor"
                  className="text-primary"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* X-axis labels */}
        <div className="ml-12 mt-2 flex justify-between text-xs text-muted-foreground">
          {data
            .filter((_, i) => i % 3 === 0 || i === data.length - 1)
            .map((d) => (
              <span key={d.month}>{d.month}</span>
            ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-4 rounded bg-primary" />
            <span className="text-muted-foreground">Historical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-4 rounded border-t-2 border-dashed border-chart-2" />
            <span className="text-muted-foreground">Forecast</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

