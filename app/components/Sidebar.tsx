import {
  LayoutDashboard,
  Users,
  FileText,
  FolderOpen,
  Settings,
  CircleDot,
} from "lucide-react";

const navigation = [
  { name: "Tableau de bord", icon: LayoutDashboard, active: true },
  { name: "Clients", icon: Users, active: false },
  { name: "Factures", icon: FileText, active: false },
  { name: "Documents", icon: FolderOpen, active: false },
  { name: "Paramètres", icon: Settings, active: false },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white">
      <div className="flex h-16 items-center gap-2 px-6">
        <CircleDot className="h-6 w-6 text-gray-900" strokeWidth={2.2} />
        <span className="text-lg font-semibold tracking-tight text-gray-900">
          Kliro
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-4 py-4">
        {navigation.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              item.active
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon className="h-[18px] w-[18px]" strokeWidth={2} />
            {item.name}
          </a>
        ))}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-medium text-white">
            JM
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-900">
              Julie Moreau
            </p>
            <p className="truncate text-xs text-gray-500">Freelance · Design</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
