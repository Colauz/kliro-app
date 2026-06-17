import {
  LayoutDashboard,
  Users,
  FileText,
  FolderOpen,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { name: "Tableau de bord", href: "/", icon: LayoutDashboard },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Factures", href: "/invoices", icon: FileText },
  { name: "Documents", href: "/documents", icon: FolderOpen },
  { name: "Paramètres", href: "/settings", icon: Settings },
];

export function isNavItemActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
