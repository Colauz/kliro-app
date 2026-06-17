import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { Stat } from "@/app/lib/mock-data";

export default function StatCard({ stat }: { stat: Stat }) {
  const isUp = stat.trend === "up";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{stat.label}</p>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl font-semibold tracking-tight text-gray-900">
          {stat.value}
        </p>
        <span
          className={`inline-flex items-center gap-0.5 text-xs font-medium ${
            isUp ? "text-emerald-600" : "text-gray-500"
          }`}
        >
          {isUp ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}
          {stat.change}
        </span>
      </div>
    </div>
  );
}
