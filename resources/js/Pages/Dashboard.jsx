import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, UserIcon, ClockIcon, TrendingUpIcon } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { AppointmentList } from "@/components/appointment-list"
import { Label } from "@/components/ui/label"

export default function Dashboard() {
  // Dados simulados para demonstração
  const upcomingAppointments = [
    { id: 1, patient: "Maria Silva", date: "2025-05-30", time: "09:00", status: "confirmado" },
    { id: 2, patient: "João Oliveira", date: "2025-05-30", time: "10:30", status: "pendente" },
    { id: 3, patient: "Ana Santos", date: "2025-05-30", time: "14:00", status: "confirmado" },
  ]

  const stats = [
    { title: "Consultas Hoje", value: "5", icon: <CalendarIcon className="h-6 w-6 text-blue-600" /> },
    { title: "Pacientes Totais", value: "128", icon: <UserIcon className="h-6 w-6 text-green-600" /> },
    { title: "Próxima Consulta", value: "09:00", icon: <ClockIcon className="h-6 w-6 text-amber-600" /> },
    { title: "Este Mês", value: "+12%", icon: <TrendingUpIcon className="h-6 w-6 text-purple-600" /> },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Label href="/dashboard/appointments/new">
            <Button>Nova Consulta</Button>
          </Label>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-full">{stat.icon}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Próximas Consultas</CardTitle>
            <CardDescription>Consultas agendadas para hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <AppointmentList appointments={upcomingAppointments} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
