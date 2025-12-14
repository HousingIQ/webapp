import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { heroStats } from "@/lib/mock-data"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-chart-2/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">
              Powered by AI + Real Data
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Where Housing Data Meets{" "}
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Predictive Intelligence
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Transform raw housing and macroeconomic data into actionable
            insights. Make data-driven real estate decisions with AI-powered
            forecasts and early warning signals.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/dashboard">
              <Button size="xl" className="gap-2">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" size="xl">
                See How It Works
              </Button>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-chart-2" />
              <span>Bank-level security</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-chart-2" />
              <span>94% forecast accuracy</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-card/50 p-6 text-center backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview mockup */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="relative rounded-xl border border-border bg-card/80 p-2 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
              <div className="h-3 w-3 rounded-full bg-destructive/50" />
              <div className="h-3 w-3 rounded-full bg-warning/50" />
              <div className="h-3 w-3 rounded-full bg-success/50" />
              <span className="ml-3 text-xs text-muted-foreground">
                HousingIQ Dashboard
              </span>
            </div>
            <div className="aspect-[16/9] rounded-b-lg bg-gradient-to-br from-muted/50 to-muted p-8">
              <div className="grid h-full grid-cols-4 gap-4">
                {/* Metric cards preview */}
                {[
                  { label: "Health Score", value: "72", color: "bg-primary" },
                  { label: "Price Growth", value: "+5.2%", color: "bg-chart-2" },
                  { label: "Inventory", value: "Low", color: "bg-warning" },
                  { label: "Rates", value: "6.89%", color: "bg-chart-3" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-border bg-card p-4"
                  >
                    <div className="text-xs text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="mt-1 text-2xl font-bold">{item.value}</div>
                    <div
                      className={`mt-2 h-1 w-full rounded-full ${item.color}/20`}
                    >
                      <div
                        className={`h-full w-2/3 rounded-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

