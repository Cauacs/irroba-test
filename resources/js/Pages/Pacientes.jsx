import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusIcon, SearchIcon } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { PatientList } from "@/components/pacient-list"

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("")

  // Dados simulados para demonstração
  const allPatients = [
    { id: 1, name: "Maria Silva", email: "maria@example.com", phone: "(11) 98765-4321", lastVisit: "2025-05-20" },
    { id: 2, name: "João Oliveira", email: "joao@example.com", phone: "(11) 91234-5678", lastVisit: "2025-05-15" },
    { id: 3, name: "Ana Santos", email: "ana@example.com", phone: "(11) 99876-5432", lastVisit: "2025-05-10" },
    { id: 4, name: "Carlos Mendes", email: "carlos@example.com", phone: "(11) 95555-4444", lastVisit: "2025-04-30" },
    { id: 5, name: "Luiza Costa", email: "luiza@example.com", phone: "(11) 94444-3333", lastVisit: "2025-04-25" },
    { id: 6, name: "Pedro Alves", email: "pedro@example.com", phone: "(11) 93333-2222", lastVisit: "2025-04-20" },
  ]

  // Filtrar os pacientes com base na pesquisa
  const filteredPatients = allPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm),
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Pacientes</h1>
          <Label href="/dashboard/patients/new">
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Novo Paciente
            </Button>
          </Label>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Buscar Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar por nome, email ou telefone..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <PatientList patients={filteredPatients} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
