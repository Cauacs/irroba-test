import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    LayoutDashboard,
    Calendar,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
} from "lucide-react";

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        {
            name: "Agendamentos",
            href: "/dashboard/appointments",
            icon: Calendar,
        },
        { name: "Pacientes", href: "/dashboard/patients", icon: Users },
        { name: "Configurações", href: "/dashboard/settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar toggle */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b p-4 flex justify-between items-center">
                <Label
                    href="/dashboard"
                    className="text-xl font-bold text-blue-700"
                >
                    MediAgenda
                </Label>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </Button>
            </div>

            {/* Sidebar backdrop for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="h-full flex flex-col">
                    <div className="p-4 border-b">
                        <Label
                            href="/dashboard"
                            className="text-xl font-bold text-blue-700"
                        >
                            MediAgenda
                        </Label>
                    </div>

                    <nav className="flex-1 p-4 space-y-1">
                        {navigation.map((item) => (
                            <Label
                                key={item.name}
                                href={item.href}
                                className={
                                    "flex items-center px-3 py-2 rounded-md text-sm font-medium"
                                }
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </Label>
                        ))}
                    </nav>

                    <div className="p-4 border-t">
                        <div className="flex items-center">
                            <Avatar className="h-8 w-8">
                                <AvatarImage
                                    src="/placeholder.svg?height=32&width=32"
                                    alt="Dr. Nome"
                                />
                                <AvatarFallback>DR</AvatarFallback>
                            </Avatar>
                            <div className="ml-3">
                                <p className="text-sm font-medium">Dr. Nome</p>
                                <p className="text-xs text-gray-500">
                                    Cardiologista
                                </p>
                            </div>
                        </div>
                        <Label
                            href="/login"
                            className="mt-4 flex items-center text-sm text-gray-700 hover:text-blue-700"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sair
                        </Label>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main
                className={`lg:ml-64 min-h-screen ${
                    isSidebarOpen ? "blur-sm" : ""
                }`}
            >
                <div className="pt-16 lg:pt-0 px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
