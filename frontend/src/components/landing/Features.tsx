import {
  LayoutDashboard,
  TrendingUp,
  Brain,
  Bell,
  type LucideIcon,
} from "lucide-react"
import { features } from "@/lib/mock-data"

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  TrendingUp,
  Brain,
  Bell,
}

export function Features() {
  return (
    <section id="features" className="border-t border-border bg-muted/30 py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to understand housing markets
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From real-time dashboards to AI-powered predictions, get the tools
            that professional analysts use.
          </p>
        </div>

        {/* Features grid */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon]
            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* How it works */}
        <div className="mx-auto mt-24 max-w-4xl">
          <h3 className="mb-12 text-center text-2xl font-bold">
            How HousingIQ Works
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Connect Data",
                description:
                  "We aggregate Zillow housing data and FRED macroeconomic indicators in real-time.",
              },
              {
                step: "2",
                title: "Analyze & Predict",
                description:
                  "Our ML models identify patterns, forecast trends, and detect early warning signals.",
              },
              {
                step: "3",
                title: "Take Action",
                description:
                  "Get actionable insights, alerts, and AI explanations to make informed decisions.",
              },
            ].map((item, index) => (
              <div key={item.step} className="relative text-center">
                {index < 2 && (
                  <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-gradient-to-r from-primary/50 to-transparent md:block" />
                )}
                <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-background text-2xl font-bold text-primary">
                  {item.step}
                </div>
                <h4 className="mb-2 font-semibold">{item.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

