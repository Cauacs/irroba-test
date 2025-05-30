import { useState } from "react"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"


export function PatientSelector({ onSelect, selectedPatientId }) {
  const [open, setOpen] = useState(false)
  const [patients, setPatients] = useState([
    { id: "1", name: "Maria Silva" },
    { id: "2", name: "João Oliveira" },
    { id: "3", name: "Ana Santos" },
    { id: "4", name: "Carlos Mendes" },
    { id: "5", name: "Luiza Costa" },
    { id: "6", name: "Pedro Alves" },
  ])

  const selectedPatient = patients.find((patient) => patient.id === selectedPatientId)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {selectedPatient ? selectedPatient.name : "Selecione um paciente"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Buscar paciente..." />
          <CommandList>
            <CommandEmpty>Nenhum paciente encontrado.</CommandEmpty>
            <CommandGroup heading="Pacientes">
              {patients.map((patient) => (
                <CommandItem
                  key={patient.id}
                  value={patient.id}
                  onSelect={(value) => {
                    onSelect(value === selectedPatientId ? null : value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", selectedPatientId === patient.id ? "opacity-100" : "opacity-0")}
                  />
                  {patient.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <Label href="/dashboard/patients/new">
                <CommandItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar novo paciente
                </CommandItem>
              </Label>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
