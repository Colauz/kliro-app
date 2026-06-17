"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleDot, LogOut } from "lucide-react";
import { navItems, isNavItemActive } from "@/app/lib/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-gray-200 bg-white md:flex">
      <div className="flex h-16 items-center gap-2 px-6">
        <CircleDot className="h-6 w-6 text-gray-900" strokeWidth={2.2} />
        <span className="text-lg font-semibold tracking-tight text-gray-900">
          Kliro
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-4 py-4">
        {navItems.map((item) => {
          const isActive = isNavItemActive(pathname, item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="h-[18px] w-[18px]" strokeWidth={2} />
              {item.name}
            </Link>
          );
        })}
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

        <Link
          href="/login"
          className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          <LogOut className="h-[18px] w-[18px]" strokeWidth={2} />
          Se déconnecter
        </Link>
      </div>
    </aside>
  );
}
