import { Button } from "@/components/ui/button"
import { CalendarIcon, UserIcon, ClipboardListIcon } from "lucide-react"
import { Label } from "@/components/ui/label"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">MediAgenda</h1>
          <div className="space-x-2">
            <Label href="/login">
              <Button variant="outline">Entrar</Button>
            </Label>
            <Label href="/register">
              <Button>Cadastrar</Button>
            </Label>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sistema de Agendamento de Consultas</h2>
            <p className="text-xl text-gray-600">Gerencie consultas e pacientes de forma simples e eficiente</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Agendamentos</h3>
              <p className="text-gray-600">Crie e gerencie agendamentos de consultas de forma eficiente</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pacientes</h3>
              <p className="text-gray-600">Cadastre e gerencie informações dos seus pacientes</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClipboardListIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Relatórios</h3>
              <p className="text-gray-600">Visualize relatórios e estatísticas das suas consultas</p>
            </div>
          </div>

          <div className="text-center">
            <Label href="/login">
              <Button size="lg" className="px-8">
                Começar agora
              </Button>
            </Label>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-gray-500">
          <p>© 2025 MediAgenda - Sistema de Agendamento de Consultas</p>
        </div>
      </footer>
    </div>
  )
}
