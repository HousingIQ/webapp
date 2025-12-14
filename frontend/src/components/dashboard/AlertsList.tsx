import { AlertTriangle, Info, CheckCircle, XCircle, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Alert } from "@/lib/mock-data"

interface AlertsListProps {
  alerts: Alert[]
}

export function AlertsList({ alerts }: AlertsListProps) {
  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "info":
        return <Info className="h-4 w-4" />
      case "success":
        return <CheckCircle className="h-4 w-4" />
      case "danger":
        return <XCircle className="h-4 w-4" />
    }
  }

  const getAlertStyles = (type: Alert["type"]) => {
    switch (type) {
      case "warning":
        return "border-warning/50 bg-warning/5 text-warning"
      case "info":
        return "border-info/50 bg-info/5 text-info"
      case "success":
        return "border-success/50 bg-success/5 text-success"
      case "danger":
        return "border-destructive/50 bg-destructive/5 text-destructive"
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={cn(
                "rounded-lg border p-3",
                getAlertStyles(alert.type)
              )}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">
                      {alert.title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {alert.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {alert.message}
                  </p>
                  {alert.region && (
                    <div className="flex items-center gap-1 pt-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {alert.region}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

