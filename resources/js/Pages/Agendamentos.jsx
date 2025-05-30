import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, PlusIcon, SearchIcon } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { AppointmentList } from "@/components/appointment-list"
import { Label } from "@/components/ui/label"

export default function Appointments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Dados simulados para demonstração
  const allAppointments = [
    { id: 1, patient: "Maria Silva", date: "2025-05-30", time: "09:00", status: "confirmado" },
    { id: 2, patient: "João Oliveira", date: "2025-05-30", time: "10:30", status: "pendente" },
    { id: 3, patient: "Ana Santos", date: "2025-05-30", time: "14:00", status: "confirmado" },
    { id: 4, patient: "Carlos Mendes", date: "2025-05-31", time: "11:00", status: "cancelado" },
    { id: 5, patient: "Luiza Costa", date: "2025-06-01", time: "15:30", status: "confirmado" },
    { id: 6, patient: "Pedro Alves", date: "2025-06-02", time: "10:00", status: "pendente" },
  ]

  // Filtrar os agendamentos com base na pesquisa e no filtro de status
  const filteredAppointments = allAppointments.filter((appointment) => {
    const matchesSearch = appointment.patient.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Agendamentos</h1>
          <Label href="/dashboard/appointments/new">
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Novo Agendamento
            </Button>
          </Label>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filtrar Agendamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar por paciente..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="confirmado">Confirmados</SelectItem>
                  <SelectItem value="pendente">Pendentes</SelectItem>
                  <SelectItem value="cancelado">Cancelados</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <CalendarIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="date" className="pl-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <AppointmentList appointments={filteredAppointments} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
