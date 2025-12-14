import { Activity, TrendingUp, Package, Percent } from "lucide-react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { MacroIndicators } from "@/components/dashboard/MacroIndicators"
import { TopMarketsTable } from "@/components/dashboard/TopMarketsTable"
import { AlertsList } from "@/components/dashboard/AlertsList"
import { PriceTrendsChart } from "@/components/dashboard/PriceTrendsChart"
import { HealthScoreGauge } from "@/components/dashboard/HealthScoreGauge"
import { dashboardData } from "@/lib/mock-data"

export function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold">Market Overview</h1>
          <p className="text-muted-foreground">
            National housing market insights and key indicators
          </p>
        </div>

        {/* Metric cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Health Score"
            value={dashboardData.healthScore}
            unit="/100"
            trend={dashboardData.healthScoreTrend}
            trendLabel="vs last month"
            icon={Activity}
            variant="default"
          />
          <MetricCard
            title="Price Growth (YoY)"
            value={`${dashboardData.priceGrowth > 0 ? "+" : ""}${dashboardData.priceGrowth}`}
            unit="%"
            trend={dashboardData.priceGrowthTrend}
            trendLabel="vs last month"
            icon={TrendingUp}
            variant="success"
          />
          <MetricCard
            title="Inventory Level"
            value={dashboardData.inventoryLevel}
            trend={dashboardData.inventoryChange}
            trendLabel="vs last month"
            icon={Package}
            variant="warning"
          />
          <MetricCard
            title="30Y Mortgage Rate"
            value={dashboardData.mortgageRate}
            unit="%"
            trend={dashboardData.mortgageRateTrend}
            trendLabel="vs last week"
            icon={Percent}
            variant="danger"
          />
        </div>

        {/* Charts row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <PriceTrendsChart data={dashboardData.priceTrends} />
          <div className="grid gap-6">
            <HealthScoreGauge
              score={dashboardData.healthScore}
              trend={dashboardData.healthScoreTrend}
            />
            <MacroIndicators indicators={dashboardData.macroIndicators} />
          </div>
        </div>

        {/* Tables row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TopMarketsTable markets={dashboardData.topMarkets} />
          </div>
          <AlertsList alerts={dashboardData.alerts} />
        </div>
      </div>
    </DashboardLayout>
  )
}

